<script>
    import { fly, fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    let navItems = [
        {
            name: 'merch',
            anchor: '/#merch',
        },
        {
            name: 'discography',
            anchor: '/discography',
        },
    ];
    let { logoSrc = '/assets/logo-white.png' } = $props();
    let mobileMenu = $state(false);

    const openMenu = () => {
        mobileMenu = true;
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileMenu = false;
        document.body.style.overflow = '';
    };
</script>

<header class="z-10 w-full bg-replicant-900 border-b border-replicant-700">
    <nav aria-label="Top" class="relative py-4 rounded">
        <div class="flex relative z-10 justify-between px-4 w-full h-full sm:px-6 lg:px-8">
            <div class="hidden items-center space-x-8 lg:flex">
                {#each navItems as navItem}
                    <a href={navItem.anchor} class="uppercase font-medium text-replicant-200">
                        {navItem.name}
                    </a>
                {/each}
            </div>
            <div class="flex gap-8 justify-start sm:justify-center">
                <a href="/">
                    <span class="sr-only">Replicant - New Jersey Death Metal</span>
                    <img src={logoSrc} alt="Replicant Logo" class="w-32" width="128" height="92" />
                </a>
            </div>
            <div class="flex justify-end items-center space-x-8">
                <div class="hidden items-center space-x-2 cursor-pointer sm:flex">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-7 h-7 text-replicant-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <button
                        class="font-medium snipcart-customer-signin text-replicant-200 cursor-pointer uppercase"
                    >
                        account
                    </button>
                </div>
                <button onclick={openMenu} class="lg:hidden cursor-pointer" aria-label="Open menu">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 text-replicant-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
                <div class="flex items-center space-x-2 cursor-pointer snipcart-checkout">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-7 h-7 text-replicant-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                    <button class="font-medium text-replicant-200 cursor-pointer relative">
                        <span class="hidden sm:inline-block uppercase">bag</span>
                        <span
                            class="ml-2 absolute hidden lg:inline-block top-0 text-sm font-medium text-tertiary group-hover:text-gray-800 snipcart-items-count"
                        ></span>
                    </button>
                </div>
            </div>
        </div>
    </nav>
</header>

{#if mobileMenu}
    <!-- Backdrop -->
    <div
        transition:fade={{ duration: 250 }}
        class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        onclick={closeMenu}
        onkeydown={(e) => {
            if (e.key === 'Escape') closeMenu();
        }}
        role="button"
        tabindex="-1"
        aria-label="Close menu"
    ></div>

    <!-- Full-screen panel -->
    <div
        transition:fly={{ x: '100%', duration: 350, easing: cubicOut }}
        class="fixed inset-0 z-50 flex flex-col bg-replicant-900 lg:hidden"
    >
        <!-- Panel header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-replicant-700">
            <a href="/" onclick={closeMenu}>
                <img src={logoSrc} alt="Replicant Logo" class="w-28" width="112" height="80" />
            </a>
            <button onclick={closeMenu} class="p-2 -mr-2 cursor-pointer" aria-label="Close menu">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7 text-replicant-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Nav links -->
        <div class="flex flex-col flex-1 justify-center px-8 space-y-8">
            {#each navItems as navItem, i}
                <a
                    href={navItem.anchor}
                    onclick={closeMenu}
                    class="text-3xl font-bold uppercase tracking-widest text-replicant-100 hover:text-white transition-colors duration-200"
                >
                    {navItem.name}
                </a>
            {/each}
        </div>

        <!-- Bottom actions -->
        <div class="px-8 pb-10 pt-6 border-t border-replicant-700 space-y-6">
            <div class="snipcart-customer-signin cursor-pointer">
                <button
                    class="flex items-center gap-3 text-lg font-medium text-replicant-200 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span class="uppercase tracking-wide">Account</span>
                </button>
            </div>
            <div class="snipcart-checkout cursor-pointer">
                <button
                    class="flex items-center gap-3 text-lg font-medium text-replicant-200 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                    <span class="uppercase tracking-wide">Bag</span>
                </button>
            </div>
        </div>
    </div>
{/if}
