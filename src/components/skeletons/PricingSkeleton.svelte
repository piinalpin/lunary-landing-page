<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
  {#each [1, 2, 3] as i}
    <div
      class="glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between relative overflow-hidden"
    >
      <div class="space-y-4">
        <!-- Badge / Label shimmer -->
        <div class="h-4 w-24 rounded-md skeleton-shimmer"></div>
        <!-- Price shimmer -->
        <div class="h-10 w-48 rounded-xl skeleton-shimmer"></div>
        <!-- Subtitle shimmer -->
        <div class="h-4 w-full rounded-md skeleton-shimmer"></div>
        <div class="h-4 w-3/4 rounded-md skeleton-shimmer"></div>

        <!-- Features list shimmer -->
        <div class="pt-6 space-y-3">
          {#each [1, 2, 3, 4] as _}
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 rounded-full skeleton-shimmer"></div>
              <div class="h-4 w-5/6 rounded-md skeleton-shimmer"></div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Button shimmer -->
      <div class="mt-8 h-12 w-full rounded-2xl skeleton-shimmer"></div>
    </div>
  {/each}
</div>

