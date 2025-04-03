<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';

    export let categories: string[] = [];
    export let selectedCategory = 'All';

    const dispatch = createEventDispatcher();

    // Debug log in the component
    onMount(() => {
        console.log('CategoryFilter received categories:', categories);
    });

    // Custom sorting function that ensures a specific order for size categories
    function customSort(items: string[]): string[] {
        // Define the desired order
        const order = {
            All: 0,
            Small: 1,
            Medium: 2,
            Large: 3,
            XL: 4,
            '2XL': 5,
            '3XL': 6,
        };

        // First add "All" if it exists
        const result: string[] = [];
        if (items.includes('All')) {
            result.push('All');
        }

        // Then add sizes in order if they exist
        ['Small', 'Medium', 'Large', 'XL', '2XL', '3XL'].forEach((size) => {
            if (items.includes(size)) {
                result.push(size);
            }
        });

        // Add any remaining items alphabetically
        const remaining = items
            .filter(
                (item) =>
                    !result.includes(item) &&
                    !['Small', 'Medium', 'Large', 'XL', '2XL', '3XL', 'All'].includes(item),
            )
            .sort();

        return [...result, ...remaining];
    }

    $: sortedCategories = customSort(categories);

    // Debug the sorted categories
    $: console.log('sortedCategories:', sortedCategories);

    function handleCategoryChange(category: string) {
        selectedCategory = category;
        dispatch('filterChange', { category });
        const event = new CustomEvent('categoryChange', { detail: { category }, bubbles: true });
        document.dispatchEvent(event);
    }
</script>

<div class="mx-auto mb-4 text-center">
    <div class="flex flex-wrap justify-center gap-4 px-4">
        {#each sortedCategories as category}
            <button
                class="px-4 py-1.5 rounded-full hover:bg-primaryColor min-w-[60px] whitespace-nowrap {selectedCategory ===
                category
                    ? 'bg-primaryColor text-replicant-900'
                    : 'bg-replicant-800 text-replicant-100'}"
                on:click={() => handleCategoryChange(category)}
            >
                {category}
            </button>
        {/each}
    </div>
</div>
