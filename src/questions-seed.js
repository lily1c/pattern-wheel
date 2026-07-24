const QBANK = [
{n:1,t:"Two Sum",d:"Easy",p:"hashmap",x:"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Each input has exactly one solution, and you may not use the same element twice.",w:"You need the original indices, so you can't sort. Store each value's index as you go and ask for the complement."},
{n:217,t:"Contains Duplicate",d:"Easy",p:"hashmap",x:"Given an integer array nums, return true if any value appears at least twice, and false if every element is distinct.",w:"Membership testing in one pass. A set answers 'seen this?' in O(1)."},
{n:242,t:"Valid Anagram",d:"Easy",p:"hashmap",x:"Given two strings s and t, return true if t is an anagram of s. An anagram uses all the original letters exactly once.",w:"Character frequencies must match. Order is irrelevant, which rules out anything order-sensitive."},
{n:49,t:"Group Anagrams",d:"Medium",p:"hashmap",x:"Given an array of strings strs, group the anagrams together. You can return the answer in any order.",w:"Sorted-string as a dictionary key. The grouping is the giveaway."},
{n:128,t:"Longest Consecutive Sequence",d:"Medium",p:"hashmap",x:"Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",w:"O(n) required rules out sorting. A set lets you check 'is n-1 present?' to find sequence starts."},
{n:1,t:"Ransom Note",d:"Easy",p:"hashmap",x:"Given two strings ransomNote and magazine, return true if ransomNote can be constructed from the letters in magazine. Each letter in magazine can only be used once.",w:"Counting available letters against required letters."},

{n:167,t:"Two Sum II — Input Array Is Sorted",d:"Medium",p:"twoptr",x:"Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target. Your solution must use only constant extra space.",w:"Sorted input plus an explicit O(1) space constraint. That combination is two pointers by elimination."},
{n:125,t:"Valid Palindrome",d:"Easy",p:"twoptr",x:"A phrase is a palindrome if, after converting all uppercase letters into lowercase and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome.",w:"Symmetry. Compare from both ends walking inward."},
{n:15,t:"3Sum",d:"Medium",p:"twoptr",x:"Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, k are distinct and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.",w:"Sort first, fix one element, then two-pointer the rest. O(n²) instead of O(n³)."},
{n:11,t:"Container With Most Water",d:"Medium",p:"twoptr",x:"You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.",w:"Two boundaries. Always move the shorter side — the taller one can't be improved by narrowing."},
{n:42,t:"Trapping Rain Water",d:"Hard",p:"twoptr",x:"Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",w:"Two pointers tracking left-max and right-max. Stacks also work, but two pointers gets O(1) space."},
{n:26,t:"Remove Duplicates from Sorted Array",d:"Easy",p:"twoptr",x:"Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. Return the number of unique elements.",w:"In-place plus sorted. A slow pointer writes, a fast pointer reads."},

{n:3,t:"Longest Substring Without Repeating Characters",d:"Medium",p:"window",x:"Given a string s, find the length of the longest substring without repeating characters.",w:"'Substring' means contiguous. Expand right, shrink left when a repeat appears."},
{n:424,t:"Longest Repeating Character Replacement",d:"Medium",p:"window",x:"You are given a string s and an integer k. You can choose any character and change it to any other uppercase English character, at most k times. Return the length of the longest substring containing the same letter you can get.",w:"'At most k' is a repairable constraint — expand until the window needs more than k changes, then shrink."},
{n:76,t:"Minimum Window Substring",d:"Hard",p:"window",x:"Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.",w:"Shortest valid contiguous range. Expand to become valid, then shrink to minimise."},
{n:643,t:"Maximum Average Subarray I",d:"Easy",p:"window",x:"You are given an integer array nums consisting of n elements, and an integer k. Find a contiguous subarray whose length is equal to k that has the maximum average value.",w:"Fixed size k. Add the entering element, subtract the leaving one — no inner loop at all."},
{n:1004,t:"Max Consecutive Ones III",d:"Medium",p:"window",x:"Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.",w:"'Consecutive' plus 'at most k' — the two loudest window keywords in one sentence."},
{n:209,t:"Minimum Size Subarray Sum",d:"Medium",p:"window",x:"Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target.",w:"All positive values means the sum grows monotonically as the window widens — that's what makes the window valid here."},

{n:20,t:"Valid Parentheses",d:"Easy",p:"stack",x:"Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Open brackets must be closed by the same type, and in the correct order.",w:"Three bracket types means a counter can't work. You need to know which opener is still waiting."},
{n:739,t:"Daily Temperatures",d:"Medium",p:"stack",x:"Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",w:"'Next warmer' is next-greater-element. Monotonic stack — and this one almost nobody guesses cold."},
{n:84,t:"Largest Rectangle in Histogram",d:"Hard",p:"stack",x:"Given an array of integers heights representing the histogram's bar heights where the width of each bar is 1, return the area of the largest rectangle in the histogram.",w:"For each bar you need the nearest shorter bar on each side. Monotonic stack finds both in one pass."},
{n:155,t:"Min Stack",d:"Medium",p:"stack",x:"Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",w:"It's in the name, but the trick is a second stack tracking the running minimum."},
{n:150,t:"Evaluate Reverse Polish Notation",d:"Medium",p:"stack",x:"You are given an array of strings tokens that represents an arithmetic expression in Reverse Polish Notation. Evaluate the expression and return an integer.",w:"Postfix evaluation is the textbook stack application — operands push, operators pop two."},
{n:22,t:"Generate Parentheses",d:"Medium",p:"backtrack",x:"Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",w:"Careful — 'valid parentheses' suggests stack, but 'generate all combinations' overrides it. The output is a list, so it's backtracking."},

{n:200,t:"Number of Islands",d:"Medium",p:"traversal",x:"Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.",w:"Flood fill each unvisited land cell. Union-Find also works — this problem legitimately accepts both."},
{n:994,t:"Rotting Oranges",d:"Medium",p:"traversal",x:"You are given an m x n grid where each cell can be empty, a fresh orange, or a rotten orange. Every minute, any fresh orange adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange.",w:"'Minimum minutes' with simultaneous spread is multi-source BFS. DFS would give you a wrong answer here."},
{n:207,t:"Course Schedule",d:"Medium",p:"traversal",x:"There are numCourses courses labeled from 0 to numCourses-1. You are given prerequisites where prerequisites[i] = [a, b] means you must take course b first. Return true if you can finish all courses.",w:"Cycle detection in a directed graph. DFS with three colours, or Kahn's topological sort."},
{n:102,t:"Binary Tree Level Order Traversal",d:"Medium",p:"traversal",x:"Given the root of a binary tree, return the level order traversal of its nodes' values, from left to right, level by level.",w:"'Level order' is BFS by definition — the queue processes one full level at a time."},
{n:133,t:"Clone Graph",d:"Medium",p:"traversal",x:"Given a reference of a node in a connected undirected graph, return a deep copy of the graph. Each node contains a value and a list of its neighbors.",w:"Traverse and build simultaneously, with a map from old node to new node to handle cycles."},
{n:733,t:"Flood Fill",d:"Easy",p:"traversal",x:"You are given an image represented by an m x n grid of integers, plus a starting pixel and a new color. Perform a flood fill on the image starting from that pixel.",w:"The name is the pattern. Recursive DFS is four lines."},

{n:215,t:"Kth Largest Element in an Array",d:"Medium",p:"heap",x:"Given an integer array nums and an integer k, return the kth largest element in the array. Can you solve it without sorting?",w:"'Without sorting' is the explicit tell. A min-heap capped at size k gives O(n log k)."},
{n:347,t:"Top K Frequent Elements",d:"Medium",p:"heap",x:"Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",w:"Count with a map, then select with a heap. Bucket sort also achieves O(n) if you want to go further."},
{n:295,t:"Find Median from Data Stream",d:"Hard",p:"heap",x:"The median is the middle value in an ordered list. Design a data structure that supports adding integers from a data stream and finding the median of all elements so far.",w:"Streaming plus median means two heaps — max-heap on the low half, min-heap on the high half."},
{n:23,t:"Merge k Sorted Lists",d:"Hard",p:"heap",x:"You are given an array of k linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",w:"A heap of size k holding the current head of each list. Pop the smallest, push its successor."},
{n:1046,t:"Last Stone Weight",d:"Easy",p:"heap",x:"You are given an array of stones. On each turn, smash the two heaviest stones together. Return the weight of the last remaining stone, or 0 if none remain.",w:"Repeatedly need the two largest. Max-heap, and you never need the full sorted order."},
{n:703,t:"Kth Largest Element in a Stream",d:"Easy",p:"heap",x:"Design a class to find the kth largest element in a stream of test scores. Implement a constructor and an add method that returns the current kth largest.",w:"Stream in the title. A size-k min-heap whose root is always the answer."},

{n:322,t:"Coin Change",d:"Medium",p:"dp",x:"You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins needed to make up that amount. Return -1 if it cannot be made.",w:"Greedy fails here. With coins [1,3,4] and target 6, greedy takes 4+1+1 but the optimum is 3+3."},
{n:70,t:"Climbing Stairs",d:"Easy",p:"dp",x:"You are climbing a staircase that takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",w:"'How many distinct ways' is a counting recurrence. It's Fibonacci in disguise."},
{n:198,t:"House Robber",d:"Medium",p:"dp",x:"You are a robber planning to rob houses along a street. Adjacent houses have security systems connected, so you cannot rob two adjacent houses. Return the maximum amount you can rob tonight.",w:"At each house, take it plus i-2, or skip it and take i-1. Branching choices with overlapping subproblems."},
{n:300,t:"Longest Increasing Subsequence",d:"Medium",p:"dp",x:"Given an integer array nums, return the length of the longest strictly increasing subsequence.",w:"'Subsequence', not 'subarray' — you're allowed to skip elements, so no window can express it."},
{n:72,t:"Edit Distance",d:"Hard",p:"dp",x:"Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You may insert, delete, or replace a character.",w:"Classic 2-D string alignment. Each cell depends on three neighbours."},
{n:139,t:"Word Break",d:"Medium",p:"dp",x:"Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",w:"'Can you reach the end' with overlapping prefixes. Greedy longest-match fails on cases like 'aaaaab'."},

{n:46,t:"Permutations",d:"Medium",p:"backtrack",x:"Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",w:"The return type is a list of lists. DP could count them but never produce them."},
{n:78,t:"Subsets",d:"Medium",p:"backtrack",x:"Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",w:"Enumerate the power set. Note n is small — check the constraints and exponential becomes permission."},
{n:39,t:"Combination Sum",d:"Medium",p:"backtrack",x:"Given an array of distinct integers candidates and a target integer, return a list of all unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen unlimited times.",w:"'All unique combinations' — you need the actual sets, not a count, so DP won't do it."},
{n:51,t:"N-Queens",d:"Hard",p:"backtrack",x:"The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return all distinct solutions.",w:"Constraint satisfaction with heavy pruning. Most branches die within two rows."},
{n:79,t:"Word Search",d:"Medium",p:"backtrack",x:"Given an m x n grid of characters and a string word, return true if word exists in the grid. The word can be constructed from sequentially adjacent cells, and the same cell may not be used more than once.",w:"DFS with an un-choose step. The 'may not reuse' constraint is what makes it backtracking rather than plain traversal."},
{n:131,t:"Palindrome Partitioning",d:"Medium",p:"backtrack",x:"Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitionings.",w:"'Return all possible' plus a validity check at each cut point."},

{n:704,t:"Binary Search",d:"Easy",p:"binsearch",x:"Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. You must write an algorithm with O(log n) runtime complexity.",w:"The complexity requirement is stated outright. That's an instruction, not a hint."},
{n:33,t:"Search in Rotated Sorted Array",d:"Medium",p:"binsearch",x:"There is an integer array nums sorted in ascending order with distinct values, possibly rotated at an unknown pivot. Given the array after rotation and an integer target, return the index of target, or -1. You must write an algorithm with O(log n) runtime complexity.",w:"Rotated but still binary-searchable — one half is always sorted, and you can determine which."},
{n:875,t:"Koko Eating Bananas",d:"Medium",p:"binsearch",x:"Koko loves to eat bananas. There are n piles, and she has h hours to eat them all. She eats k bananas per hour from a single pile. Return the minimum integer k such that she can eat all the bananas within h hours.",w:"'Minimum k such that' — binary search on the answer space, not on the array. The piles aren't even sorted."},
{n:153,t:"Find Minimum in Rotated Sorted Array",d:"Medium",p:"binsearch",x:"Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. You must write an algorithm that runs in O(log n) time.",w:"Compare mid against the right end to decide which half contains the pivot."},
{n:4,t:"Median of Two Sorted Arrays",d:"Hard",p:"binsearch",x:"Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",w:"Binary search on the partition point of the smaller array."},
{n:1011,t:"Capacity To Ship Packages Within D Days",d:"Medium",p:"binsearch",x:"A conveyor belt has packages that must be shipped within days days. Return the least weight capacity of the ship that will result in all packages being shipped within days days.",w:"'Least capacity such that' — same shape as Koko. Search the answer range, test feasibility."},

{n:547,t:"Number of Provinces",d:"Medium",p:"unionfind",x:"There are n cities, some connected directly or indirectly. A province is a group of directly or indirectly connected cities. Given an n x n matrix isConnected, return the total number of provinces.",w:"Transitive grouping, and nobody asks how far apart cities are. DFS works too, but union-find is the natural fit."},
{n:721,t:"Accounts Merge",d:"Medium",p:"unionfind",x:"Given a list of accounts where each element contains a name followed by emails, merge accounts belonging to the same person. Two accounts belong to the same person if they share a common email.",w:"Transitive merging — A shares with B, B shares with C, so all three collapse. A single group-by pass cannot do this."},
{n:684,t:"Redundant Connection",d:"Medium",p:"unionfind",x:"In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with n nodes plus one additional edge. Return the edge that can be removed so the result is a tree.",w:"The first union that returns false is your answer — that edge closed a cycle."},
{n:323,t:"Number of Connected Components",d:"Medium",p:"unionfind",x:"You have a graph of n nodes. You are given an integer n and an array edges where each element indicates an undirected edge. Return the number of connected components in the graph.",w:"Start the count at n and decrement on each successful union."},
{n:990,t:"Satisfiability of Equality Equations",d:"Medium",p:"unionfind",x:"You are given an array of strings equations representing relationships between variables, such as 'a==b' or 'a!=b'. Return true if it is possible to assign integers to variable names so as to satisfy all the equations.",w:"Union all the equalities first, then check every inequality against the resulting groups."},
{n:261,t:"Graph Valid Tree",d:"Medium",p:"unionfind",x:"You have a graph of n nodes labeled from 0 to n-1. Given n and a list of undirected edges, return true if the edges make up a valid tree.",w:"A valid tree has exactly n-1 edges and no cycles. Union-find gives you the cycle check for free."}
];

const CODEQ = [
{p:"window",code:`<span class="k">def</span> f(s, k):
    <span class="k">from</span> collections <span class="k">import</span> defaultdict
    count = defaultdict(<span class="k">int</span>)
    left = best = <span class="s">0</span>
    <span class="k">for</span> right <span class="k">in</span> <span class="k">range</span>(<span class="k">len</span>(s)):
        count[s[right]] += <span class="s">1</span>
        <span class="k">while</span> <span class="k">len</span>(count) &gt; k:
            count[s[left]] -= <span class="s">1</span>
            <span class="k">if</span> count[s[left]] == <span class="s">0</span>:
                <span class="k">del</span> count[s[left]]
            left += <span class="s">1</span>
        best = <span class="k">max</span>(best, right - left + <span class="s">1</span>)
    <span class="k">return</span> best`,w:"Two indices where right always advances and left only advances to restore validity. The while loop shrinks rather than restarts — that's the window signature."},

{p:"binsearch",code:`<span class="k">def</span> f(a, t):
    lo, hi = <span class="s">0</span>, <span class="k">len</span>(a) - <span class="s">1</span>
    <span class="k">while</span> lo &lt;= hi:
        mid = (lo + hi) // <span class="s">2</span>
        <span class="k">if</span> a[mid] == t:
            <span class="k">return</span> mid
        <span class="k">if</span> a[mid] &lt; t:
            lo = mid + <span class="s">1</span>
        <span class="k">else</span>:
            hi = mid - <span class="s">1</span>
    <span class="k">return</span> -<span class="s">1</span>`,w:"Halving the range each iteration via a midpoint. The lo/hi/mid trio is unmistakable."},

{p:"stack",code:`<span class="k">def</span> f(nums):
    res = [<span class="s">0</span>] * <span class="k">len</span>(nums)
    st = []
    <span class="k">for</span> i, v <span class="k">in</span> <span class="k">enumerate</span>(nums):
        <span class="k">while</span> st <span class="k">and</span> nums[st[-<span class="s">1</span>]] &lt; v:
            j = st.pop()
            res[j] = i - j
        st.append(i)
    <span class="k">return</span> res`,w:"A list used with append and pop from the end, popping while a comparison holds. That's a monotonic stack, not a queue."},

{p:"traversal",code:`<span class="k">from</span> collections <span class="k">import</span> deque

<span class="k">def</span> f(graph, start):
    q = deque([(start, <span class="s">0</span>)])
    seen = {start}
    <span class="k">while</span> q:
        node, d = q.popleft()
        <span class="k">for</span> nxt <span class="k">in</span> graph[node]:
            <span class="k">if</span> nxt <span class="k">not</span> <span class="k">in</span> seen:
                seen.add(nxt)
                q.append((nxt, d + <span class="s">1</span>))
    <span class="k">return</span> seen`,w:"popleft means FIFO, which means BFS. Swap it for pop() and the same code becomes DFS — that one method call is the entire difference."},

{p:"backtrack",code:`<span class="k">def</span> f(nums):
    res, path = [], []
    <span class="k">def</span> go(start):
        res.append(path[:])
        <span class="k">for</span> i <span class="k">in</span> <span class="k">range</span>(start, <span class="k">len</span>(nums)):
            path.append(nums[i])
            go(i + <span class="s">1</span>)
            path.pop()
    go(<span class="s">0</span>)
    <span class="k">return</span> res`,w:"append, recurse, pop. That pop after the recursive call is the un-choose step — the defining move of backtracking."},

{p:"dp",code:`<span class="k">def</span> f(nums):
    <span class="k">if</span> <span class="k">not</span> nums: <span class="k">return</span> <span class="s">0</span>
    prev2 = prev1 = <span class="s">0</span>
    <span class="k">for</span> v <span class="k">in</span> nums:
        cur = <span class="k">max</span>(prev1, prev2 + v)
        prev2, prev1 = prev1, cur
    <span class="k">return</span> prev1`,w:"Each step chooses between two earlier states with max. That's a recurrence with the table collapsed to two variables."},

{p:"unionfind",code:`<span class="k">def</span> find(p, x):
    <span class="k">while</span> p[x] != x:
        p[x] = p[p[x]]
        x = p[x]
    <span class="k">return</span> x

<span class="k">def</span> f(n, edges):
    p = <span class="k">list</span>(<span class="k">range</span>(n))
    c = n
    <span class="k">for</span> a, b <span class="k">in</span> edges:
        ra, rb = find(p, a), find(p, b)
        <span class="k">if</span> ra != rb:
            p[rb] = ra
            c -= <span class="s">1</span>
    <span class="k">return</span> c`,w:"A parent array with path compression inside find. No traversal anywhere — just merging."},

{p:"heap",code:`<span class="k">import</span> heapq

<span class="k">def</span> f(nums, k):
    h = []
    <span class="k">for</span> v <span class="k">in</span> nums:
        heapq.heappush(h, v)
        <span class="k">if</span> <span class="k">len</span>(h) &gt; k:
            heapq.heappop(h)
    <span class="k">return</span> h[<span class="s">0</span>]`,w:"heappush paired with a size cap. Keeping the heap at k is what makes this O(n log k) rather than a sort."},

{p:"twoptr",code:`<span class="k">def</span> f(h):
    lo, hi = <span class="s">0</span>, <span class="k">len</span>(h) - <span class="s">1</span>
    best = <span class="s">0</span>
    <span class="k">while</span> lo &lt; hi:
        best = <span class="k">max</span>(best, <span class="k">min</span>(h[lo], h[hi]) * (hi - lo))
        <span class="k">if</span> h[lo] &lt; h[hi]:
            lo += <span class="s">1</span>
        <span class="k">else</span>:
            hi -= <span class="s">1</span>
    <span class="k">return</span> best`,w:"Both indices move inward and there's no midpoint. Binary search halves; two pointers converge one step at a time."},

{p:"hashmap",code:`<span class="k">def</span> f(nums, target):
    seen = {}
    <span class="k">for</span> i, v <span class="k">in</span> <span class="k">enumerate</span>(nums):
        <span class="k">if</span> target - v <span class="k">in</span> seen:
            <span class="k">return</span> [seen[target - v], i]
        seen[v] = i
    <span class="k">return</span> []`,w:"One pass, storing as it goes, asking for the complement. Indices are preserved, which sorting would have destroyed."},

{p:"traversal",code:`<span class="k">def</span> f(grid):
    R, C = <span class="k">len</span>(grid), <span class="k">len</span>(grid[<span class="s">0</span>])
    <span class="k">def</span> go(r, c):
        <span class="k">if</span> <span class="k">not</span> (<span class="s">0</span> &lt;= r &lt; R <span class="k">and</span> <span class="s">0</span> &lt;= c &lt; C):
            <span class="k">return</span>
        <span class="k">if</span> grid[r][c] != <span class="s">'1'</span>:
            <span class="k">return</span>
        grid[r][c] = <span class="s">'0'</span>
        go(r+<span class="s">1</span>, c); go(r-<span class="s">1</span>, c)
        go(r, c+<span class="s">1</span>); go(r, c-<span class="s">1</span>)
    n = <span class="s">0</span>
    <span class="k">for</span> r <span class="k">in</span> <span class="k">range</span>(R):
        <span class="k">for</span> c <span class="k">in</span> <span class="k">range</span>(C):
            <span class="k">if</span> grid[r][c] == <span class="s">'1'</span>:
                go(r, c); n += <span class="s">1</span>
    <span class="k">return</span> n`,w:"Recursive four-way expansion that mutates cells to mark them visited. Flood-fill DFS — no queue, so not BFS."},

{p:"window",code:`<span class="k">def</span> f(nums, k):
    cur = <span class="k">sum</span>(nums[:k])
    best = cur
    <span class="k">for</span> i <span class="k">in</span> <span class="k">range</span>(k, <span class="k">len</span>(nums)):
        cur += nums[i] - nums[i-k]
        best = <span class="k">max</span>(best, cur)
    <span class="k">return</span> best`,w:"Fixed-size window. The single line adding the newcomer and subtracting the leaver is the slide."},

{p:"dp",code:`<span class="k">def</span> f(coins, amount):
    INF = <span class="k">float</span>(<span class="s">'inf'</span>)
    dp = [<span class="s">0</span>] + [INF] * amount
    <span class="k">for</span> a <span class="k">in</span> <span class="k">range</span>(<span class="s">1</span>, amount + <span class="s">1</span>):
        <span class="k">for</span> c <span class="k">in</span> coins:
            <span class="k">if</span> c &lt;= a:
                dp[a] = <span class="k">min</span>(dp[a], dp[a-c] + <span class="s">1</span>)
    <span class="k">return</span> -<span class="s">1</span> <span class="k">if</span> dp[amount] == INF <span class="k">else</span> dp[amount]`,w:"A table indexed by subproblem size, filled bottom-up, each cell reading smaller cells. Textbook DP."},

{p:"binsearch",code:`<span class="k">def</span> f(piles, hours):
    <span class="k">def</span> ok(k):
        <span class="k">return</span> <span class="k">sum</span>((p + k - <span class="s">1</span>) // k <span class="k">for</span> p <span class="k">in</span> piles) &lt;= hours
    lo, hi = <span class="s">1</span>, <span class="k">max</span>(piles)
    <span class="k">while</span> lo &lt; hi:
        mid = (lo + hi) // <span class="s">2</span>
        <span class="k">if</span> ok(mid):
            hi = mid
        <span class="k">else</span>:
            lo = mid + <span class="s">1</span>
    <span class="k">return</span> lo`,w:"The input is never sorted — it's searching a range of candidate answers with a feasibility check. Binary search on the answer space."},

{p:"hashmap",code:`<span class="k">from</span> collections <span class="k">import</span> defaultdict

<span class="k">def</span> f(strs):
    groups = defaultdict(<span class="k">list</span>)
    <span class="k">for</span> s <span class="k">in</span> strs:
        key = <span class="s">''</span>.join(<span class="k">sorted</span>(s))
        groups[key].append(s)
    <span class="k">return</span> <span class="k">list</span>(groups.values())`,w:"A derived key mapping to buckets. The sorted() call builds the key — it isn't sorting the algorithm's input."},

{p:"stack",code:`<span class="k">def</span> f(s):
    pairs = {<span class="s">')'</span>: <span class="s">'('</span>, <span class="s">']'</span>: <span class="s">'['</span>, <span class="s">'}'</span>: <span class="s">'{'</span>}
    st = []
    <span class="k">for</span> ch <span class="k">in</span> s:
        <span class="k">if</span> ch <span class="k">in</span> pairs.values():
            st.append(ch)
        <span class="k">elif</span> ch <span class="k">in</span> pairs:
            <span class="k">if</span> <span class="k">not</span> st <span class="k">or</span> st.pop() != pairs[ch]:
                <span class="k">return</span> <span class="k">False</span>
    <span class="k">return</span> <span class="k">not</span> st`,w:"A dict appears, but it's only a lookup table for pairings. The algorithm is push/pop — the stack is doing the work."},

{p:"twoptr",code:`<span class="k">def</span> f(nums):
    nums.sort()
    res = []
    <span class="k">for</span> i <span class="k">in</span> <span class="k">range</span>(<span class="k">len</span>(nums) - <span class="s">2</span>):
        <span class="k">if</span> i &gt; <span class="s">0</span> <span class="k">and</span> nums[i] == nums[i-<span class="s">1</span>]:
            <span class="k">continue</span>
        lo, hi = i + <span class="s">1</span>, <span class="k">len</span>(nums) - <span class="s">1</span>
        <span class="k">while</span> lo &lt; hi:
            t = nums[i] + nums[lo] + nums[hi]
            <span class="k">if</span> t &lt; <span class="s">0</span>: lo += <span class="s">1</span>
            <span class="k">elif</span> t &gt; <span class="s">0</span>: hi -= <span class="s">1</span>
            <span class="k">else</span>:
                res.append([nums[i], nums[lo], nums[hi]])
                lo += <span class="s">1</span>
                <span class="k">while</span> lo &lt; hi <span class="k">and</span> nums[lo] == nums[lo-<span class="s">1</span>]:
                    lo += <span class="s">1</span>
    <span class="k">return</span> res`,w:"Sort, fix an anchor, then converge two pointers on the remainder. The sort exists to enable the pointers."},

{p:"heap",code:`<span class="k">import</span> heapq

<span class="k">class</span> C:
    <span class="k">def</span> __init__(self):
        self.lo = []
        self.hi = []
    <span class="k">def</span> add(self, x):
        heapq.heappush(self.lo, -x)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        <span class="k">if</span> <span class="k">len</span>(self.hi) &gt; <span class="k">len</span>(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))
    <span class="k">def</span> get(self):
        <span class="k">if</span> <span class="k">len</span>(self.lo) &gt; <span class="k">len</span>(self.hi):
            <span class="k">return</span> -self.lo[<span class="s">0</span>]
        <span class="k">return</span> (-self.lo[<span class="s">0</span>] + self.hi[<span class="s">0</span>]) / <span class="s">2</span>`,w:"Two heaps kept balanced, one negated to fake a max-heap. This is the running-median structure."},

{p:"backtrack",code:`<span class="k">def</span> f(n):
    res = []
    <span class="k">def</span> go(s, open_, close):
        <span class="k">if</span> <span class="k">len</span>(s) == <span class="s">2</span> * n:
            res.append(s)
            <span class="k">return</span>
        <span class="k">if</span> open_ &lt; n:
            go(s + <span class="s">'('</span>, open_ + <span class="s">1</span>, close)
        <span class="k">if</span> close &lt; open_:
            go(s + <span class="s">')'</span>, open_, close + <span class="s">1</span>)
    go(<span class="s">''</span>, <span class="s">0</span>, <span class="s">0</span>)
    <span class="k">return</span> res`,w:"Parentheses suggest a stack, but this builds every valid string and returns a list. The guards are pruning, not matching."},

{p:"unionfind",code:`<span class="k">def</span> f(n, edges):
    p = <span class="k">list</span>(<span class="k">range</span>(n))
    <span class="k">def</span> find(x):
        <span class="k">while</span> p[x] != x:
            p[x] = p[p[x]]
            x = p[x]
        <span class="k">return</span> x
    <span class="k">for</span> a, b <span class="k">in</span> edges:
        ra, rb = find(a), find(b)
        <span class="k">if</span> ra == rb:
            <span class="k">return</span> [a, b]
        p[rb] = ra
    <span class="k">return</span> []`,w:"Returning the edge whose endpoints already share a root. That's cycle detection by merging, with no traversal at all."}
];
