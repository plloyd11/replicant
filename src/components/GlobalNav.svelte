<script>
    import { fly, slide } from 'svelte/transition';
    import { backIn, cubicOut } from 'svelte/easing';

    let navItems = [
        {
            name: 'shop',
            anchor: '#shop'
        },
        {
            name: 'videos',
            anchor: '#videos'
        },
        {
            name: 'about',
            anchor: '#about'
        },
    ]
    let mobileMenu = false;

    const toggleMobileMenu = () => {
        mobileMenu = !mobileMenu;
    }
</script>

<header class="shadow z-10 w-full sm:fixed sm:top-5 sm:max-w-[calc(100%-80px)] sm:left-[40px]">
    <nav aria-label="Top" class="py-2 bg-replicant-800 rounded relative">
        <div
            class="px-4 sm:px-6 lg:px-8 w-full h-full z-10 relative grid grid-cols-2 sm:grid-cols-3"
        >
            <div class="hidden sm:flex items-center space-x-8">
                {#each navItems as navItem}
                    <a href={navItem.anchor} class="text-lg text-replicant-200 font-medium">
                        {navItem.name}
                    </a>
                {/each}
            </div>
            <div class="flex justify-start sm:justify-center">
                <a href="#intro">
                    <span class="sr-only">Replicant - New Jersey Death Metal</span>
                    <img src="/assets/logo-white.png" alt="Replicant Logo" class="w-24" />
                </a>
            </div>
            <div class="flex items-center justify-end space-x-8">
                <div class="hidden sm:flex items-center space-x-2 cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-7 w-7 text-replicant-200"
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
                    <button class="snipcart-customer-signin text-replicant-200 font-medium">
                        account
                    </button>
                </div>
                <div on:click={toggleMobileMenu} class="sm:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-replicant-100 cursor-pointer"
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
                </div>
                <div class="flex items-center space-x-2 cursor-pointer snipcart-checkout">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-7 w-7 text-replicant-200"
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
                    <button class="text-replicant-200 font-medium">
                        <span class="hidden sm:inline-block">bag</span>
                        <span
                            class="ml-2 text-sm font-medium text-tertiaryColor group-hover:text-gray-800 snipcart-items-count"
                        />
                    </button>
                </div>
            </div>
        </div>
        {#if mobileMenu}
            <div
                transition:slide={{
                    duration: 300,
                    opacity: 0.75,
                    easing: cubicOut
                }}
                class="absolute top-[88px] z-[15] inset-x-0 transition transform origin-top-right max-w-xs mx-auto"
            >
                <div
                    class="shadow-2xl rounded-br-lg rounded-bl-lg p-6 ring-1 ring-black ring-opacity-5 bg-replicant-700 divide-y-2 divide-gray-50"
                >
                    <div class="flex flex-col space-y-4">
                        {#each navItems as navItem}
                            <a href={navItem.anchor} class="text-lg text-replicant-200 font-medium">
                                {navItem.name}
                            </a>
                        {/each}
                        <div
                            class="flex justify-between items-center space-x-2 snipcart-customer-signin cursor-pointer"
                        >
                            <button class="text-replicant-200 font-medium"> account </button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-7 w-7 text-replicant-200"
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
                        </div>
                    </div>
                </div>
            </div>
            <div on:click|self={toggleMobileMenu} class="fixed w-screen h-screen z-[10]" />
        {/if}
    </nav>
</header>
