<script>
    let navItems = [
        {
            name: 'shop',
            anchor: '#shop'
        },
        {
            name: 'releases',
            anchor: '#releases'
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
</script>

<header class="fixed top-5 shadow z-10 w-full max-w-[calc(100%-80px)] left-[40px]">
    <nav aria-label="Top" class="py-2 bg-replicant-800 rounded">
        <div class="px-4 sm:px-6 lg:px-8 w-full h-full z-10 relative grid grid-cols-3">
            <div class="flex items-center space-x-8">
                {#each navItems as navItem}
                    <a href={navItem.anchor} class="text-lg text-replicant-200 font-medium">
                        {navItem.name}
                    </a>
                {/each}
            </div>
            <div class="flex justify-center">
                <a href="#intro">
                    <span class="sr-only">Replicant - New Jersey Death Metal</span>
                    <img src="/assets/logo-white.png" alt="Replicant Logo" class="w-24" />
                </a>
            </div>
            <div class="flex items-center justify-end space-x-8">
                <div class="flex items-center space-x-2 cursor-pointer">
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
                <div class="flex items-center space-x-2 cursor-pointer">
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
                    <button class="snipcart-checkout text-replicant-200 font-medium">
                        bag
                        <span
                            class="ml-2 text-sm font-medium text-tertiaryColor group-hover:text-gray-800 snipcart-items-count"
                        />
                    </button>
                </div>
            </div>
        </div>
    </nav>
</header>
