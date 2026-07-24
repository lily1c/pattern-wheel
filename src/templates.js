const TPL = {
hashmap:[
{h:"Frequency map",s:"Count everything in one pass, then read the counts.",c:`<span class="k">from</span> collections <span class="k">import</span> Counter

<span class="k">def</span> is_anagram(a, b):
    <span class="k">return</span> Counter(a) == Counter(b)

<span class="k">def</span> first_unique(s):
    freq = Counter(s)
    <span class="k">for</span> i, ch <span class="k">in</span> <span class="k">enumerate</span>(s):
        <span class="k">if</span> freq[ch] == <span class="s">1</span>:
            <span class="k">return</span> i
    <span class="k">return</span> -<span class="s">1</span>`},
{h:"Complement lookup",s:"Store what you've seen; ask for what you need. This is Two Sum.",c:`<span class="k">def</span> two_sum(nums, target):
    seen = {}                       <span class="c"># value -> index</span>
    <span class="k">for</span> i, v <span class="k">in</span> <span class="k">enumerate</span>(nums):
        want = target - v
        <span class="k">if</span> want <span class="k">in</span> seen:
            <span class="k">return</span> [seen[want], i]
        seen[v] = i
    <span class="k">return</span> []

<span class="c"># O(n) time, O(n) space, indices preserved</span>`}],

twoptr:[
{h:"Opposite ends",s:"Start wide, walk inward. Move the side that can improve the answer.",c:`<span class="k">def</span> two_sum_sorted(nums, target):
    lo, hi = <span class="s">0</span>, <span class="k">len</span>(nums) - <span class="s">1</span>
    <span class="k">while</span> lo &lt; hi:
        cur = nums[lo] + nums[hi]
        <span class="k">if</span> cur == target: <span class="k">return</span> [lo, hi]
        <span class="k">if</span> cur &lt; target: lo += <span class="s">1</span>   <span class="c"># need bigger</span>
        <span class="k">else</span>:            hi -= <span class="s">1</span>   <span class="c"># need smaller</span>
    <span class="k">return</span> []`},
{h:"3Sum — sort, then fix one",s:"Outer loop fixes a, inner two-pointer finds b+c. Skip duplicates.",c:`<span class="k">def</span> three_sum(nums):
    nums.sort()
    res = []
    <span class="k">for</span> i <span class="k">in</span> <span class="k">range</span>(<span class="k">len</span>(nums) - <span class="s">2</span>):
        <span class="k">if</span> i &gt; <span class="s">0</span> <span class="k">and</span> nums[i] == nums[i-<span class="s">1</span>]:
            <span class="k">continue</span>                <span class="c"># skip dup anchor</span>
        lo, hi = i + <span class="s">1</span>, <span class="k">len</span>(nums) - <span class="s">1</span>
        <span class="k">while</span> lo &lt; hi:
            t = nums[i] + nums[lo] + nums[hi]
            <span class="k">if</span> t &lt; <span class="s">0</span>:   lo += <span class="s">1</span>
            <span class="k">elif</span> t &gt; <span class="s">0</span>: hi -= <span class="s">1</span>
            <span class="k">else</span>:
                res.append([nums[i], nums[lo], nums[hi]])
                lo += <span class="s">1</span>
                <span class="k">while</span> lo &lt; hi <span class="k">and</span> nums[lo] == nums[lo-<span class="s">1</span>]:
                    lo += <span class="s">1</span>       <span class="c"># skip dup</span>
    <span class="k">return</span> res`}],

window:[
{h:"Variable size",s:"Expand right always. Shrink left only while invalid.",c:`<span class="k">def</span> longest_unique(s):
    seen = <span class="k">set</span>()
    left = best = <span class="s">0</span>
    <span class="k">for</span> right <span class="k">in</span> <span class="k">range</span>(<span class="k">len</span>(s)):
        <span class="k">while</span> s[right] <span class="k">in</span> seen:      <span class="c"># invalid</span>
            seen.remove(s[left])
            left += <span class="s">1</span>
        seen.add(s[right])
        best = <span class="k">max</span>(best, right - left + <span class="s">1</span>)
    <span class="k">return</span> best`},
{h:"Fixed size k",s:"Add the entering element, drop the leaving one. No inner loop.",c:`<span class="k">def</span> max_sum_k(nums, k):
    cur = <span class="k">sum</span>(nums[:k])
    best = cur
    <span class="k">for</span> i <span class="k">in</span> <span class="k">range</span>(k, <span class="k">len</span>(nums)):
        cur += nums[i] - nums[i-k]   <span class="c"># slide</span>
        best = <span class="k">max</span>(best, cur)
    <span class="k">return</span> best`}],

stack:[
{h:"Bracket matching",s:"Push openers, pop on closers, check the pair.",c:`<span class="k">def</span> is_valid(s):
    pairs = {<span class="s">')'</span>: <span class="s">'('</span>, <span class="s">']'</span>: <span class="s">'['</span>, <span class="s">'}'</span>: <span class="s">'{'</span>}
    stack = []
    <span class="k">for</span> ch <span class="k">in</span> s:
        <span class="k">if</span> ch <span class="k">in</span> pairs.values():
            stack.append(ch)
        <span class="k">elif</span> ch <span class="k">in</span> pairs:
            <span class="k">if</span> <span class="k">not</span> stack <span class="k">or</span> stack.pop() != pairs[ch]:
                <span class="k">return</span> <span class="k">False</span>
    <span class="k">return</span> <span class="k">not</span> stack       <span class="c"># nothing left open</span>`},
{h:"Monotonic stack",s:"Pop everything the current element beats. Each index in/out once → O(n).",c:`<span class="k">def</span> daily_temperatures(temps):
    res = [<span class="s">0</span>] * <span class="k">len</span>(temps)
    stack = []                    <span class="c"># indices, decreasing temps</span>
    <span class="k">for</span> i, t <span class="k">in</span> <span class="k">enumerate</span>(temps):
        <span class="k">while</span> stack <span class="k">and</span> temps[stack[-<span class="s">1</span>]] &lt; t:
            j = stack.pop()
            res[j] = i - j        <span class="c"># days waited</span>
        stack.append(i)
    <span class="k">return</span> res`}],

traversal:[
{h:"BFS — shortest path",s:"Queue + distance. This is the one for “fewest steps”.",c:`<span class="k">from</span> collections <span class="k">import</span> deque

<span class="k">def</span> shortest_path(grid, start, goal):
    R, C = <span class="k">len</span>(grid), <span class="k">len</span>(grid[<span class="s">0</span>])
    q = deque([(start, <span class="s">0</span>)])
    seen = {start}
    <span class="k">while</span> q:
        (r, c), d = q.popleft()
        <span class="k">if</span> (r, c) == goal: <span class="k">return</span> d
        <span class="k">for</span> dr, dc <span class="k">in</span> ((<span class="s">1</span>,<span class="s">0</span>), (-<span class="s">1</span>,<span class="s">0</span>), (<span class="s">0</span>,<span class="s">1</span>), (<span class="s">0</span>,-<span class="s">1</span>)):
            nr, nc = r + dr, c + dc
            <span class="k">if</span> <span class="s">0</span> &lt;= nr &lt; R <span class="k">and</span> <span class="s">0</span> &lt;= nc &lt; C \\
               <span class="k">and</span> (nr, nc) <span class="k">not</span> <span class="k">in</span> seen <span class="k">and</span> grid[nr][nc] != <span class="s">'#'</span>:
                seen.add((nr, nc))
                q.append(((nr, nc), d + <span class="s">1</span>))
    <span class="k">return</span> -<span class="s">1</span>`},
{h:"DFS — flood fill",s:"Sink the island as you visit it. No separate visited set needed.",c:`<span class="k">def</span> num_islands(grid):
    <span class="k">if</span> <span class="k">not</span> grid: <span class="k">return</span> <span class="s">0</span>
    R, C = <span class="k">len</span>(grid), <span class="k">len</span>(grid[<span class="s">0</span>])

    <span class="k">def</span> sink(r, c):
        <span class="k">if</span> <span class="k">not</span> (<span class="s">0</span> &lt;= r &lt; R <span class="k">and</span> <span class="s">0</span> &lt;= c &lt; C) <span class="k">or</span> grid[r][c] != <span class="s">'1'</span>:
            <span class="k">return</span>
        grid[r][c] = <span class="s">'0'</span>              <span class="c"># mark visited</span>
        sink(r+<span class="s">1</span>, c); sink(r-<span class="s">1</span>, c)
        sink(r, c+<span class="s">1</span>); sink(r, c-<span class="s">1</span>)

    count = <span class="s">0</span>
    <span class="k">for</span> r <span class="k">in</span> <span class="k">range</span>(R):
        <span class="k">for</span> c <span class="k">in</span> <span class="k">range</span>(C):
            <span class="k">if</span> grid[r][c] == <span class="s">'1'</span>:
                sink(r, c)
                count += <span class="s">1</span>
    <span class="k">return</span> count`}],

heap:[
{h:"Top k with a size-k heap",s:"Keep it at size k. A heap of size n is just a slow sort.",c:`<span class="k">import</span> heapq

<span class="k">def</span> kth_largest(nums, k):
    h = []
    <span class="k">for</span> v <span class="k">in</span> nums:
        heapq.heappush(h, v)
        <span class="k">if</span> <span class="k">len</span>(h) &gt; k:
            heapq.heappop(h)     <span class="c"># drop the smallest</span>
    <span class="k">return</span> h[<span class="s">0</span>]

<span class="c"># O(n log k), not O(n log n)</span>

<span class="c"># max-heap: negate going in and out</span>
<span class="k">def</span> push_max(h, v): heapq.heappush(h, -v)
<span class="k">def</span> pop_max(h):     <span class="k">return</span> -heapq.heappop(h)`},
{h:"Two heaps — running median",s:"Max-heap on the low half, min-heap on the high half.",c:`<span class="k">import</span> heapq

<span class="k">class</span> MedianFinder:
    <span class="k">def</span> __init__(self):
        self.lo = []   <span class="c"># max-heap (negated)</span>
        self.hi = []   <span class="c"># min-heap</span>

    <span class="k">def</span> add(self, num):
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        <span class="k">if</span> <span class="k">len</span>(self.hi) &gt; <span class="k">len</span>(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    <span class="k">def</span> median(self):
        <span class="k">if</span> <span class="k">len</span>(self.lo) &gt; <span class="k">len</span>(self.hi):
            <span class="k">return</span> -self.lo[<span class="s">0</span>]
        <span class="k">return</span> (-self.lo[<span class="s">0</span>] + self.hi[<span class="s">0</span>]) / <span class="s">2</span>`}],

dp:[
{h:"1-D bottom up",s:"Coin change. Test greedy first — here it fails.",c:`<span class="k">def</span> coin_change(coins, amount):
    INF = <span class="k">float</span>(<span class="s">'inf'</span>)
    dp = [<span class="s">0</span>] + [INF] * amount
    <span class="k">for</span> a <span class="k">in</span> <span class="k">range</span>(<span class="s">1</span>, amount + <span class="s">1</span>):
        <span class="k">for</span> c <span class="k">in</span> coins:
            <span class="k">if</span> c &lt;= a:
                dp[a] = <span class="k">min</span>(dp[a], dp[a-c] + <span class="s">1</span>)
    <span class="k">return</span> -<span class="s">1</span> <span class="k">if</span> dp[amount] == INF <span class="k">else</span> dp[amount]

<span class="c"># coins=[1,3,4], amount=6</span>
<span class="c"># greedy: 4+1+1 = 3 coins</span>
<span class="c"># optimal: 3+3   = 2 coins</span>`},
{h:"2-D + space collapse",s:"If row i only reads row i−1, you need two rows, not n.",c:`<span class="k">def</span> lcs(a, b):
    prev = [<span class="s">0</span>] * (<span class="k">len</span>(b) + <span class="s">1</span>)
    <span class="k">for</span> i <span class="k">in</span> <span class="k">range</span>(<span class="s">1</span>, <span class="k">len</span>(a) + <span class="s">1</span>):
        cur = [<span class="s">0</span>] * (<span class="k">len</span>(b) + <span class="s">1</span>)
        <span class="k">for</span> j <span class="k">in</span> <span class="k">range</span>(<span class="s">1</span>, <span class="k">len</span>(b) + <span class="s">1</span>):
            <span class="k">if</span> a[i-<span class="s">1</span>] == b[j-<span class="s">1</span>]:
                cur[j] = prev[j-<span class="s">1</span>] + <span class="s">1</span>
            <span class="k">else</span>:
                cur[j] = <span class="k">max</span>(prev[j], cur[j-<span class="s">1</span>])
        prev = cur                  <span class="c"># O(n) space, not O(n*m)</span>
    <span class="k">return</span> prev[-<span class="s">1</span>]`}],

backtrack:[
{h:"Choose / recurse / un-choose",s:"The un-choose line is the whole pattern.",c:`<span class="k">def</span> permute(nums):
    res, path, used = [], [], [<span class="k">False</span>] * <span class="k">len</span>(nums)

    <span class="k">def</span> dfs():
        <span class="k">if</span> <span class="k">len</span>(path) == <span class="k">len</span>(nums):
            res.append(path[:])      <span class="c"># copy, not reference!</span>
            <span class="k">return</span>
        <span class="k">for</span> i, v <span class="k">in</span> <span class="k">enumerate</span>(nums):
            <span class="k">if</span> used[i]: <span class="k">continue</span>
            used[i] = <span class="k">True</span>; path.append(v)      <span class="c"># choose</span>
            dfs()                                <span class="c"># recurse</span>
            path.pop(); used[i] = <span class="k">False</span>       <span class="c"># un-choose</span>

    dfs()
    <span class="k">return</span> res`},
{h:"Subsets with pruning",s:"Start index prevents re-picking. Skip duplicates at the same depth.",c:`<span class="k">def</span> subsets(nums):
    res, path = [], []

    <span class="k">def</span> dfs(start):
        res.append(path[:])
        <span class="k">for</span> i <span class="k">in</span> <span class="k">range</span>(start, <span class="k">len</span>(nums)):
            path.append(nums[i])
            dfs(i + <span class="s">1</span>)          <span class="c"># i+1: never look back</span>
            path.pop()

    dfs(<span class="s">0</span>)
    <span class="k">return</span> res`}],

binsearch:[
{h:"Classic — find a value",s:"Sorted array, exact target.",c:`<span class="k">def</span> search(nums, target):
    lo, hi = <span class="s">0</span>, <span class="k">len</span>(nums) - <span class="s">1</span>
    <span class="k">while</span> lo &lt;= hi:
        mid = (lo + hi) // <span class="s">2</span>
        <span class="k">if</span> nums[mid] == target: <span class="k">return</span> mid
        <span class="k">if</span> nums[mid] &lt; target: lo = mid + <span class="s">1</span>
        <span class="k">else</span>:                  hi = mid - <span class="s">1</span>
    <span class="k">return</span> -<span class="s">1</span>`},
{h:"Search the answer space",s:"The array may not be sorted. The ANSWER is monotonic. This is the one people miss.",c:`<span class="k">def</span> min_feasible(lo, hi, check):
    <span class="c"># smallest x in [lo,hi] where check(x) is True</span>
    <span class="k">while</span> lo &lt; hi:
        mid = (lo + hi) // <span class="s">2</span>
        <span class="k">if</span> check(mid): hi = mid
        <span class="k">else</span>:          lo = mid + <span class="s">1</span>
    <span class="k">return</span> lo

<span class="c"># Koko eating bananas:</span>
<span class="k">def</span> min_speed(piles, hours):
    <span class="k">def</span> ok(k):
        <span class="k">return</span> <span class="k">sum</span>((p + k - <span class="s">1</span>) // k <span class="k">for</span> p <span class="k">in</span> piles) &lt;= hours
    <span class="k">return</span> min_feasible(<span class="s">1</span>, <span class="k">max</span>(piles), ok)`}],

unionfind:[
{h:"DSU with path compression",s:"union() returning False means you found a cycle.",c:`<span class="k">class</span> DSU:
    <span class="k">def</span> __init__(self, n):
        self.p = <span class="k">list</span>(<span class="k">range</span>(n))
        self.r = [<span class="s">0</span>] * n

    <span class="k">def</span> find(self, x):
        <span class="k">while</span> self.p[x] != x:
            self.p[x] = self.p[self.p[x]]    <span class="c"># compress</span>
            x = self.p[x]
        <span class="k">return</span> x

    <span class="k">def</span> union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        <span class="k">if</span> ra == rb:
            <span class="k">return</span> <span class="k">False</span>                   <span class="c"># cycle!</span>
        <span class="k">if</span> self.r[ra] &lt; self.r[rb]:
            ra, rb = rb, ra
        self.p[rb] = ra
        <span class="k">if</span> self.r[ra] == self.r[rb]:
            self.r[ra] += <span class="s">1</span>
        <span class="k">return</span> <span class="k">True</span>`},
{h:"Counting components",s:"Start at n, decrement on every successful union.",c:`<span class="k">def</span> count_components(n, edges):
    dsu = DSU(n)
    count = n
    <span class="k">for</span> a, b <span class="k">in</span> edges:
        <span class="k">if</span> dsu.union(a, b):
            count -= <span class="s">1</span>        <span class="c"># two groups became one</span>
    <span class="k">return</span> count`}]
};
