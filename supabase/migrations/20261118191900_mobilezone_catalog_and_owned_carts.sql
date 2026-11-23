create table public.products (
  id uuid primary key default gen_random_uuid(),
  sku text not null unique,
  name varchar(160) not null,
  brand varchar(100) not null,
  image text,
  official_price numeric(12, 2) not null check (official_price >= 0),
  badge text,
  description text,
  details text,
  specs text[] not null default '{}',
  tagline text
);

create table public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete restrict,
  quantity integer not null check (quantity between 1 and 99),
  unique (cart_id, product_id)
);

create index cart_items_product_id_idx on public.cart_items (product_id);

alter table public.products enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;

revoke all on table public.products, public.carts, public.cart_items from public, anon, authenticated;
grant select on table public.products to anon, authenticated;
grant select, insert, update, delete on table public.carts, public.cart_items to authenticated;

create policy "Products are readable by everyone"
  on public.products for select
  to anon, authenticated
  using (true);

create policy "Users can read their own cart"
  on public.carts for select
  to authenticated
  using (user_id = (select auth.uid()));

create policy "Users can create their own cart"
  on public.carts for insert
  to authenticated
  with check (user_id = (select auth.uid()));

create policy "Users can update their own cart"
  on public.carts for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "Users can delete their own cart"
  on public.carts for delete
  to authenticated
  using (user_id = (select auth.uid()));

create policy "Users can read items in their own cart"
  on public.cart_items for select
  to authenticated
  using (
    exists (
      select 1
      from public.carts
      where carts.id = cart_items.cart_id
        and carts.user_id = (select auth.uid())
    )
  );

create policy "Users can add items to their own cart"
  on public.cart_items for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.carts
      where carts.id = cart_items.cart_id
        and carts.user_id = (select auth.uid())
    )
  );

create policy "Users can update items in their own cart"
  on public.cart_items for update
  to authenticated
  using (
    exists (
      select 1
      from public.carts
      where carts.id = cart_items.cart_id
        and carts.user_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
      from public.carts
      where carts.id = cart_items.cart_id
        and carts.user_id = (select auth.uid())
    )
  );

create policy "Users can delete items from their own cart"
  on public.cart_items for delete
  to authenticated
  using (
    exists (
      select 1
      from public.carts
      where carts.id = cart_items.cart_id
        and carts.user_id = (select auth.uid())
    )
  );

create or replace function public.add_cart_item(p_product_id uuid, p_quantity integer default 1)
returns public.cart_items
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_cart_id uuid;
  v_item public.cart_items;
begin
  if (select auth.uid()) is null then
    raise insufficient_privilege using message = 'Authentication is required to modify a cart.';
  end if;

  if p_quantity is null or p_quantity < 1 or p_quantity > 99 then
    raise check_violation using message = 'Quantity must be an integer between 1 and 99.';
  end if;

  select id
  into v_cart_id
  from public.carts
  where user_id = (select auth.uid());

  if v_cart_id is null then
    raise no_data_found using message = 'The authenticated user does not have a cart.';
  end if;

  insert into public.cart_items as existing_item (cart_id, product_id, quantity)
  values (v_cart_id, p_product_id, p_quantity)
  on conflict (cart_id, product_id)
  do update set quantity = existing_item.quantity + excluded.quantity
  where existing_item.quantity + excluded.quantity <= 99
  returning * into v_item;

  if not found then
    raise check_violation using message = 'The cart item quantity cannot exceed 99.';
  end if;

  return v_item;
end;
$$;

revoke all on function public.add_cart_item(uuid, integer) from public, anon;
grant execute on function public.add_cart_item(uuid, integer) to authenticated;
