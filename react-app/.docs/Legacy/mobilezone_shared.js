(function () {
    const facebookUrl = 'https://www.facebook.com/MobileZone.AR';
    const phoneNumber = '59162628578';
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    document.querySelectorAll('img').forEach((image) => {
        if (!image.hasAttribute('alt')) image.alt = image.dataset.alt || 'Imagen de MobileZone';
        if (!image.hasAttribute('width')) image.width = 600;
        if (!image.hasAttribute('height')) image.height = 600;
        if (!image.hasAttribute('decoding')) image.decoding = 'async';
    });

    const visualStyle = document.createElement('style');
    visualStyle.textContent = `
        :root {
            --mz-ink: #10233f;
            --mz-muted: #5c6b7f;
            --mz-blue: #155eef;
            --mz-blue-dark: #0b3cae;
            --mz-mint: #0b8f68;
            --mz-line: #dce5f0;
            --mz-cloud: #f3f7fc;
            --mz-shadow: 0 18px 50px rgba(16, 35, 63, .08);
        }
        html { background: #f7faff; }
        body {
            color: var(--mz-ink) !important;
            background: radial-gradient(circle at 88% 4%, rgba(21, 94, 239, .09), transparent 25rem), #f7faff !important;
        }
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            pointer-events: none;
            opacity: .35;
            background-image: linear-gradient(rgba(21, 94, 239, .035) 1px, transparent 1px), linear-gradient(90deg, rgba(21, 94, 239, .035) 1px, transparent 1px);
            background-size: 36px 36px;
            mask-image: linear-gradient(to bottom, black, transparent 72%);
        }
        header {
            background: rgba(255, 255, 255, .82) !important;
            border-color: rgba(220, 229, 240, .9) !important;
            box-shadow: 0 8px 30px rgba(16, 35, 63, .06) !important;
        }
        header > div { min-height: 4.5rem; padding-inline: clamp(1rem, 5vw, 4rem); }
        header a:first-child { letter-spacing: .08em !important; font-size: 1.1rem !important; }
        header nav a { transition: color .25s ease, transform .25s ease; }
        header nav a:hover { transform: translateY(-1px); }
        header button { transition: background-color .25s ease, color .25s ease, transform .25s ease; }
        header button:hover { color: var(--mz-blue-dark); transform: translateY(-1px); }
        .mz-mobile-menu a { display: block; padding: .8rem 1rem; border-radius: .6rem; color: var(--mz-ink); font-weight: 700; }
        .mz-mobile-menu a:hover { background: var(--mz-cloud); color: var(--mz-blue); }
        .mz-search-panel { display: none; }
        .cart-page, .offers-page { padding-inline: clamp(1rem, 5vw, 4rem) !important; }
        button:not([disabled]), a[role="button"] {
            transition: background-color .25s ease, border-color .25s ease, color .25s ease, box-shadow .25s ease, transform .25s ease, filter .25s ease !important;
        }
        button:not([disabled]):hover, a[role="button"]:hover {
            filter: brightness(1.04);
            box-shadow: 0 8px 18px rgba(16, 35, 63, .1);
            transform: translateY(-1px);
        }
        button:not([disabled]):active, a[role="button"]:active { transform: translateY(0) scale(.98); }
        button.bg-primary:hover, button.bg-primary-container:hover, .offers-page button:hover, .cart-page button:hover { filter: brightness(1.06); }
        main { position: relative; z-index: 1; }
        main > section { position: relative; }
        main > section > .max-w-max-width, footer > div { padding-inline: clamp(1rem, 5vw, 4rem); }
        h1, h2, h3, h4 { color: var(--mz-ink); text-wrap: balance; }
        p { color: var(--mz-muted); }
        a, button, input, select { -webkit-tap-highlight-color: transparent; }
        a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible { outline: 3px solid rgba(21, 94, 239, .28); outline-offset: 3px; }
        button, a[class*="bg-primary"], a[class*="bg-primary-container"] { font-weight: 700 !important; }
        a[class*="bg-primary"], a[class*="bg-primary-container"], button.bg-primary, button.bg-primary-container {
            box-shadow: 0 10px 22px rgba(21, 94, 239, .2);
            transition: transform .25s ease, box-shadow .25s ease, background-color .25s ease;
        }
        a[class*="bg-primary"]:hover, a[class*="bg-primary-container"]:hover, button.bg-primary:hover, button.bg-primary-container:hover { transform: translateY(-2px); box-shadow: 0 14px 28px rgba(21, 94, 239, .28); }
        input, select { border-color: var(--mz-line) !important; color: var(--mz-ink) !important; background: rgba(255,255,255,.9) !important; }
        input:focus, select:focus { border-color: var(--mz-blue) !important; box-shadow: 0 0 0 4px rgba(21, 94, 239, .12) !important; }
        #contactForm #submitBtn { background: var(--mz-blue) !important; color: #fff !important; border: 1px solid var(--mz-blue-dark); }
        #contactForm #submitBtn:hover { background: var(--mz-blue-dark) !important; color: #fff !important; }
        #product-modal .modal-content { color: var(--mz-ink) !important; }
        #product-modal .modal-content p, #product-modal .modal-content li { color: var(--mz-ink) !important; line-height: 1.65 !important; }
        #productModal > div:last-child > div:last-child, #product-modal .modal-content > div:last-child {
            background: rgba(255, 255, 255, .98) !important;
            box-shadow: inset 10px 0 24px rgba(16, 35, 63, .06);
            color: var(--mz-ink) !important;
        }
        #productModal > div:first-child, #product-modal {
            background: rgba(16, 35, 63, .58) !important;
            backdrop-filter: blur(9px) saturate(.9) !important;
            -webkit-backdrop-filter: blur(9px) saturate(.9) !important;
        }
        #productModal > div:last-child > div:last-child h2, #product-modal .modal-content > div:last-child h2 {
            color: var(--mz-ink) !important;
            text-shadow: 0 1px 0 rgba(255, 255, 255, .9);
        }
        #productModal #modalDesc, #product-modal .modal-content > div:last-child > p {
            background: #f4f7fb !important;
            border-left: 4px solid var(--mz-blue);
            border-radius: .5rem;
            box-shadow: 0 3px 10px rgba(16, 35, 63, .08);
            padding: .85rem 1rem;
            color: var(--mz-ink) !important;
        }
        #productModal .space-y-4, #product-modal .space-y-4 {
            background: #f8fafc;
            border-radius: .5rem;
            padding: .9rem 1rem;
            box-shadow: 0 3px 10px rgba(16, 35, 63, .06);
        }
        .glass-card, .glass-panel, article {
            border-color: rgba(220, 229, 240, .92) !important;
            box-shadow: var(--mz-shadow) !important;
            transition: transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease, border-color .3s ease !important;
        }
        .glass-card:hover, .glass-panel:hover, article:hover { border-color: rgba(21, 94, 239, .24) !important; box-shadow: 0 24px 60px rgba(16, 35, 63, .13) !important; }
        footer { position: relative; z-index: 1; background: rgba(255,255,255,.82) !important; border-color: var(--mz-line) !important; }
        #inicio { min-height: min(780px, calc(100vh - 4.5rem)); padding-top: 5.5rem; padding-bottom: 5.5rem; background: linear-gradient(135deg, #edf4ff 0%, #f8fbff 48%, #fff 100%) !important; }
        #inicio::after { content: ''; position: absolute; width: 28rem; height: 28rem; right: 5%; top: 8%; border: 1px solid rgba(21,94,239,.12); border-radius: 50%; box-shadow: 0 0 0 34px rgba(21,94,239,.035), 0 0 0 68px rgba(21,94,239,.025); pointer-events: none; }
        #inicio > .max-w-max-width { padding-inline: clamp(1rem, 5vw, 4rem); }
        #inicio h1 { max-width: 12ch; font-size: clamp(2.7rem, 5vw, 4.7rem); line-height: .98; letter-spacing: -.045em; }
        #inicio p { max-width: 34rem; font-size: 1.08rem; }
        #inicio > div:last-child img { filter: drop-shadow(0 28px 28px rgba(16,35,63,.18)); }
        article, .product-card { animation: mz-rise .6s both; }
        article:nth-child(2), .product-card:nth-child(2) { animation-delay: .08s; }
        article:nth-child(3), .product-card:nth-child(3) { animation-delay: .16s; }
        article:nth-child(4), .product-card:nth-child(4) { animation-delay: .24s; }
        article:nth-child(5), .product-card:nth-child(5) { animation-delay: .32s; }
        @keyframes mz-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        #inicio h1, #inicio p, #inicio .flex.flex-wrap { animation: mz-rise .7s both; }
        #inicio p { animation-delay: .1s; } #inicio .flex.flex-wrap { animation-delay: .18s; }
        @media (max-width: 767px) {
            header > div { min-height: 4rem; padding-inline: 1rem; }
            main > section > .max-w-max-width, footer > div, #inicio > .max-w-max-width { padding-inline: 1rem; }
            #inicio { min-height: auto; padding-top: 4rem; padding-bottom: 4rem; }
            #inicio::after { width: 15rem; height: 15rem; right: -4rem; top: 48%; }
            #inicio h1 { max-width: 12ch; font-size: 2.8rem; }
            .cart-page, .offers-page { padding-inline: 1rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .01ms !important; }
        }
    `;
    document.head.appendChild(visualStyle);

    const routes = {
        inicio: 'inicio.html', smartphones: 'smartphones.html', comparar: 'comparar.html',
        ofertas: 'ofertas.html', contacto: 'contacto.html', carrito: 'carrito.html'
    };
    const cartKey = 'mobilezone-cart-items';
    const oldCountKey = 'mobilezone-cart-count';
    const readItems = () => {
        try { return JSON.parse(localStorage.getItem(cartKey) || '[]'); } catch { return []; }
    };
    const saveItems = (items) => {
        localStorage.setItem(cartKey, JSON.stringify(items.filter((item) => item.quantity > 0)));
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem(oldCountKey, String(count));
        document.querySelectorAll('#cart-counter, [data-cart-counter]').forEach((counter) => {
            counter.textContent = count;
            counter.classList.toggle('hidden', count === 0);
        });
    };
    const productFrom = (button) => {
        const card = button.closest('article, .product-card, .glass-card');
        const title = card?.querySelector('h3')?.textContent.trim() || 'Producto MobileZone';
        const priceText = card?.querySelector('.text-primary, .text-secondary')?.textContent || '$565.67';
        return { name: title, price: Number(priceText.replace(/[^0-9.]/g, '')) || 565.67, image: card?.querySelector('img')?.src || '' };
    };
    window.mobilezoneAddToCart = function (amount, product) {
        const items = readItems();
        const selected = product || { name: 'Producto MobileZone', price: 565.67 };
        const existing = items.find((item) => item.name === selected.name);
        if (existing) existing.quantity += amount || 1;
        else items.push({ ...selected, quantity: amount || 1 });
        saveItems(items);
        return items.reduce((sum, item) => sum + item.quantity, 0);
    };
    window.addToCart = function (clickEvent) {
        return mobilezoneAddToCart(1, productFrom(clickEvent?.currentTarget || window.event?.currentTarget || document.body));
    };
    window.mobilezoneGo = (route) => { if (routes[route]) window.location.href = routes[route]; };

    const routeForText = (text) => {
        const value = text.trim().toLowerCase();
        if (value.includes('smartphone')) return 'smartphones'; if (value.includes('compar')) return 'comparar';
        if (value.includes('ofert')) return 'ofertas'; if (value.includes('contact') || value.includes('soporte')) return 'contacto';
        if (value.includes('inicio') || value === 'home' || value.includes('mobilezone')) return 'inicio'; return null;
    };
    const shell = () => {
        const active = location.pathname.includes('smartphones') ? 'smartphones' : location.pathname.includes('comparar') ? 'comparar' : location.pathname.includes('ofertas') ? 'ofertas' : location.pathname.includes('contacto') ? 'contacto' : 'inicio';
        const nav = document.createElement('header');
        nav.className = 'fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-line shadow-sm';
        nav.innerHTML = `<div class="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full max-w-max-width mx-auto"><a class="font-display-hero text-headline-md tracking-tighter text-primary" href="${routes.inicio}">MOBILEZONE</a><nav class="hidden md:flex items-center gap-6">${[['inicio','Inicio'],['smartphones','Smartphones'],['comparar','Comparar'],['ofertas','Ofertas'],['contacto','Contacto']].map(([key,label]) => `<a class="font-body-md ${active === key ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant'} pb-1" href="${routes[key]}">${label}</a>`).join('')}</nav><div class="flex items-center gap-4 text-primary"><button aria-label="Carrito de compras" data-cart-button class="p-2 rounded-full hover:bg-surface-container-low"><span class="material-symbols-outlined">shopping_cart</span><span id="cart-counter" class="absolute -mt-1 -mr-1 bg-error text-on-error text-label-sm w-5 h-5 rounded-full flex items-center justify-center">0</span></button><button aria-label="Buscar" data-search-button class="p-2 rounded-full hover:bg-surface-container-low"><span class="material-symbols-outlined">search</span></button><button aria-label="Menú" data-menu-button class="md:hidden p-2 rounded-full"><span class="material-symbols-outlined">menu</span></button></div></div><div data-mobile-menu class="hidden absolute top-16 left-0 right-0 bg-white border-b border-line shadow-lg p-4 flex-col gap-1">${[['inicio','Inicio'],['smartphones','Smartphones'],['comparar','Comparar'],['ofertas','Ofertas'],['contacto','Contacto']].map(([key,label]) => `<a href="${routes[key]}">${label}</a>`).join('')}</div>`;
        document.querySelector('header, nav')?.remove(); document.body.prepend(nav);
        const footer = document.querySelector('footer');
        if (footer) footer.innerHTML = footer.innerHTML.replace(/https:\/\/wa\.me\/[^"']+/g, whatsappUrl).replace(/\+\d[\d ()-]+/g, `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`);
    };
    const renderCart = () => {
        const container = document.querySelector('.lg\\:col-span-8'); if (!container) return;
        let items = readItems();
        if (!items.length) { const count = Number(localStorage.getItem(oldCountKey) || 0); if (count) items = [{ name: 'Productos seleccionados', price: 565.67, quantity: count }]; }
        container.querySelectorAll('.glass-panel').forEach((item) => item.remove());
        items.forEach((item, index) => { const row = document.createElement('div'); row.className = 'glass-panel rounded-xl p-4 md:p-6 flex flex-col sm:flex-row gap-6 relative soft-shadow bg-surface-container-lowest'; row.innerHTML = `<img src="${item.image || ''}" alt="${item.name}" class="w-20 h-20 object-contain rounded-lg bg-surface-container-low p-2 flex-shrink-0" /><div class="flex-grow"><div class="flex justify-between"><h3 class="font-headline-md text-lg">${item.name}</h3><button aria-label="Eliminar producto" class="text-muted hover:text-error p-1" data-remove="${index}"><span class="material-symbols-outlined">delete</span></button></div><div class="flex justify-between items-center mt-6"><div class="flex items-center border border-line rounded-lg overflow-hidden"><button aria-label="Disminuir cantidad" class="px-3 py-1" data-minus="${index}">-</button><span class="px-3 min-w-[2rem] text-center">${item.quantity}</span><button aria-label="Aumentar cantidad" class="px-3 py-1" data-plus="${index}">+</button></div><span class="font-headline-md text-primary text-xl">$${(item.price * item.quantity).toFixed(2)}</span></div></div>`; container.prepend(row); });
        container.querySelectorAll('[data-remove]').forEach((button) => button.onclick = () => { items.splice(Number(button.dataset.remove), 1); saveItems(items); renderCart(); });
        container.querySelectorAll('[data-minus], [data-plus]').forEach((button) => button.onclick = () => { const item = items[Number(button.dataset.minus ?? button.dataset.plus)]; item.quantity += button.dataset.plus ? 1 : -1; saveItems(items); renderCart(); });
        const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0); const count = items.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.lg\\:col-span-4 .space-y-4 span').forEach((span) => { if (span.textContent.includes('Subtotal')) span.textContent = `Subtotal (${count} artículos)`; });
        document.querySelectorAll('.lg\\:col-span-4 .text-3xl').forEach((el) => el.textContent = `$${total.toFixed(2)}`);
    };
    document.addEventListener('DOMContentLoaded', () => {
        shell();
        let initialItems = readItems();
        if (!initialItems.length) {
            const oldCount = Number(localStorage.getItem(oldCountKey) || 0);
            if (oldCount) initialItems = [{ name: 'Productos seleccionados', price: 565.67, quantity: oldCount }];
        }
        saveItems(initialItems); renderCart();
        document.querySelectorAll('[data-cart-button]').forEach((button) => button.onclick = () => window.mobilezoneGo('carrito'));
        document.querySelectorAll('[data-menu-button]').forEach((button) => button.onclick = () => {
            const menu = document.querySelector('[data-mobile-menu]');
            menu?.classList.toggle('hidden');
            menu?.classList.toggle('flex');
        });
        document.querySelectorAll('[data-search-button]').forEach((button) => button.onclick = () => {
            const input = document.querySelector('#searchInput');
            if (input) { input.focus(); input.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
            let panel = document.querySelector('.mz-search-panel');
            if (!panel) {
                panel = document.createElement('form');
                panel.className = 'mz-search-panel fixed top-20 left-4 right-4 md:left-1/3 md:right-1/3 z-50 bg-white p-3 rounded-xl shadow-xl border border-line';
                panel.innerHTML = '<input class="w-full px-4 py-3 rounded-lg border border-line" type="search" placeholder="Buscar smartphones..." aria-label="Buscar smartphones" />';
                panel.onsubmit = (event) => { event.preventDefault(); const value = panel.querySelector('input').value.trim(); if (value) window.location.href = `${routes.smartphones}?search=${encodeURIComponent(value)}`; };
                document.body.append(panel);
            }
            panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
            panel.querySelector('input').focus();
        });
        const query = new URLSearchParams(location.search).get('search')?.toLowerCase();
        if (query) {
            const input = document.querySelector('#searchInput');
            if (input) { input.value = query; input.dispatchEvent(new Event('input')); }
            document.querySelectorAll('article, .product-card').forEach((card) => { card.style.display = card.textContent.toLowerCase().includes(query) ? '' : 'none'; });
        }
        document.querySelectorAll('button').forEach((button) => {
            const text = button.textContent.trim().toLowerCase(); const label = (button.getAttribute('aria-label') || '').toLowerCase();
            if (/añadir|add to cart|comprar|add_shopping_cart/.test(text) && !/explorar|ver todas/.test(text)) button.onclick = () => { mobilezoneAddToCart(1, productFrom(button)); if (button.closest('#productModal, #product-modal')) window.closeModal?.(); if (/comprar/.test(text)) window.mobilezoneGo('carrito'); };
        });
        document.querySelectorAll('button').forEach((button) => {
            if (button.textContent.trim().toLowerCase().includes('ver todas las ofertas')) button.onclick = () => window.mobilezoneGo('ofertas');
        });
        const sort = document.querySelector('select'); const grid = sort?.closest('section')?.querySelector('.grid');
        if (sort && grid) sort.onchange = () => [...grid.children].sort((a, b) => { const price = (card) => Number((card.querySelector('.text-primary')?.textContent || '0').replace(/[^0-9.]/g, '')); return sort.selectedIndex === 1 ? price(a) - price(b) : sort.selectedIndex === 2 ? price(b) - price(a) : 0; }).forEach((card) => grid.append(card));
        if (location.pathname.includes('smartphones')) { document.querySelector('aside')?.remove(); document.querySelector('main .mt-12.flex.justify-center')?.remove(); }
    });
})();
