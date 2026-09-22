<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  {#each [1, 2, 3] as i}
    <div class="glass-card p-7 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
      <div class="space-y-3">
        <div class="h-4 w-20 rounded skeleton-shimmer"></div>
        <div class="h-4 w-full rounded skeleton-shimmer"></div>
        <div class="h-4 w-5/6 rounded skeleton-shimmer"></div>
        <div class="h-4 w-3/4 rounded skeleton-shimmer"></div>
      </div>
      <div class="pt-4 border-t border-white/5 flex items-center gap-3">
        <div class="w-10 h-10 rounded-full skeleton-shimmer"></div>
        <div class="space-y-1.5 flex-1">
          <div class="h-4 w-28 rounded skeleton-shimmer"></div>
          <div class="h-3 w-36 rounded skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  {/each}
</div>

