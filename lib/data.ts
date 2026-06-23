// ---- All mock/demo data for the UI. No backend. ----

export type Difficulty = "Easy" | "Medium" | "Hard";

/* ---------------- DSA SHEETS ---------------- */
export type SheetProblem = { name: string; difficulty: Difficulty; done?: boolean };
export type SheetPattern = { name: string; blurb: string; problems: SheetProblem[] };
export type SheetGroup = { topic: string; patterns: SheetPattern[] };

export const sweSheet: SheetGroup[] = [
  {
    topic: "Arrays",
    patterns: [
      {
        name: "Two Pointers",
        blurb: "Converge from both ends to hit O(n) on sorted-ish data.",
        problems: [
          { name: "Two Sum II", difficulty: "Easy", done: true },
          { name: "Container With Most Water", difficulty: "Medium" },
          { name: "3Sum", difficulty: "Medium" },
          { name: "Trapping Rain Water", difficulty: "Hard" },
        ],
      },
      {
        name: "Sliding Window",
        blurb: "Maintain a moving range to track running subarray state.",
        problems: [
          { name: "Max Subarray Sum K", difficulty: "Easy", done: true },
          { name: "Longest Substring No Repeat", difficulty: "Medium" },
          { name: "Minimum Window Substring", difficulty: "Hard" },
        ],
      },
      {
        name: "Prefix Sum",
        blurb: "Precompute cumulative sums for O(1) range queries.",
        problems: [
          { name: "Subarray Sum Equals K", difficulty: "Medium" },
          { name: "Range Sum Query", difficulty: "Easy" },
        ],
      },
    ],
  },
  {
    topic: "Binary Search",
    patterns: [
      {
        name: "Search on Answer",
        blurb: "Binary search the answer space, not the array.",
        problems: [
          { name: "Koko Eating Bananas", difficulty: "Medium" },
          { name: "Split Array Largest Sum", difficulty: "Hard" },
          { name: "Capacity to Ship Packages", difficulty: "Medium" },
        ],
      },
      {
        name: "Bounds",
        blurb: "Lower / upper bound to locate insertion points.",
        problems: [
          { name: "Find First & Last Position", difficulty: "Medium" },
          { name: "Search Insert Position", difficulty: "Easy", done: true },
        ],
      },
    ],
  },
  {
    topic: "Dynamic Programming",
    patterns: [
      {
        name: "0/1 Knapsack",
        blurb: "Pick or skip each item under a capacity constraint.",
        problems: [
          { name: "Partition Equal Subset Sum", difficulty: "Medium" },
          { name: "Target Sum", difficulty: "Medium" },
          { name: "Last Stone Weight II", difficulty: "Medium" },
        ],
      },
      {
        name: "Stocks",
        blurb: "State machines over buy / sell / cooldown transitions.",
        problems: [
          { name: "Best Time to Buy & Sell", difficulty: "Easy", done: true },
          { name: "With Cooldown", difficulty: "Medium" },
          { name: "At Most K Transactions", difficulty: "Hard" },
        ],
      },
    ],
  },
  {
    topic: "Graphs",
    patterns: [
      {
        name: "BFS / DFS",
        blurb: "Traverse components, grids and shortest unweighted paths.",
        problems: [
          { name: "Number of Islands", difficulty: "Medium" },
          { name: "Rotting Oranges", difficulty: "Medium" },
          { name: "Clone Graph", difficulty: "Medium" },
        ],
      },
      {
        name: "Topological Sort",
        blurb: "Order DAG nodes by dependency using Kahn's algorithm.",
        problems: [
          { name: "Course Schedule", difficulty: "Medium" },
          { name: "Alien Dictionary", difficulty: "Hard" },
        ],
      },
    ],
  },
];

export const lastMin100: SheetGroup[] = [
  {
    topic: "Must-Do Before Interview",
    patterns: [
      {
        name: "High-Frequency Picks",
        blurb: "The 100 problems that show up again and again — solve these last.",
        problems: [
          { name: "Two Sum", difficulty: "Easy", done: true },
          { name: "Valid Parentheses", difficulty: "Easy", done: true },
          { name: "Merge Intervals", difficulty: "Medium" },
          { name: "LRU Cache", difficulty: "Medium" },
          { name: "Word Ladder", difficulty: "Hard" },
          { name: "Median of Two Sorted Arrays", difficulty: "Hard" },
        ],
      },
    ],
  },
  {
    topic: "Quick Revision Patterns",
    patterns: [
      {
        name: "One-Liners to Remember",
        blurb: "Patterns you should be able to recall in under 30 seconds.",
        problems: [
          { name: "Kadane's Maximum Subarray", difficulty: "Medium" },
          { name: "Dutch National Flag", difficulty: "Medium" },
          { name: "Floyd's Cycle Detection", difficulty: "Medium" },
          { name: "Quickselect Kth Largest", difficulty: "Medium" },
        ],
      },
    ],
  },
];

/* ---------------- SQL ---------------- */
export type SqlProblem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  description: string;
  approach: string;
  query: string;
};

export const sqlProblems: SqlProblem[] = [
  {
    id: "second-highest",
    title: "Second Highest Salary",
    difficulty: "Medium",
    tags: ["Subquery", "Aggregation"],
    description:
      "Given an Employee table, report the second highest distinct salary. If there is no second highest salary, return null.",
    approach:
      "Find the MAX salary, then take the MAX of all salaries strictly less than it. Wrapping in a subquery guarantees a NULL row when only one distinct salary exists.",
    query: `SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);`,
  },
  {
    id: "dept-top-earners",
    title: "Department Top Three Salaries",
    difficulty: "Hard",
    tags: ["Window Function", "DENSE_RANK"],
    description:
      "A company wants the employees who earn one of the top three unique salaries in each department.",
    approach:
      "Use DENSE_RANK() partitioned by department, ordered by salary descending. Keep rows where the rank is ≤ 3 — DENSE_RANK handles ties so equal salaries share a rank.",
    query: `SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM (
  SELECT *,
    DENSE_RANK() OVER (
      PARTITION BY departmentId ORDER BY salary DESC
    ) AS rnk
  FROM Employee
) e
JOIN Department d ON d.id = e.departmentId
WHERE e.rnk <= 3;`,
  },
  {
    id: "consecutive-nums",
    title: "Consecutive Numbers",
    difficulty: "Medium",
    tags: ["Window Function", "LAG/LEAD"],
    description:
      "Find all numbers that appear at least three times consecutively in the Logs table.",
    approach:
      "Use LEAD() to peek at the next two rows by id. When the current value equals both look-aheads, you have a run of three.",
    query: `SELECT DISTINCT num AS ConsecutiveNums
FROM (
  SELECT num,
    LEAD(num, 1) OVER (ORDER BY id) AS n1,
    LEAD(num, 2) OVER (ORDER BY id) AS n2
  FROM Logs
) t
WHERE num = n1 AND num = n2;`,
  },
  {
    id: "duplicate-emails",
    title: "Duplicate Emails",
    difficulty: "Easy",
    tags: ["GROUP BY", "HAVING"],
    description: "Report all email addresses that occur more than once.",
    approach:
      "Group by the email column and keep only groups whose COUNT is greater than one using HAVING.",
    query: `SELECT email
FROM Person
GROUP BY email
HAVING COUNT(*) > 1;`,
  },
];

/* ---------------- APTITUDE ---------------- */
export type AptOption = string;
export type AptQuestion = { q: string; options: AptOption[]; answer: number };
export type AptTopic = {
  id: string;
  title: string;
  description: string;
  formula: string;
  questions: AptQuestion[];
};

export const aptitudeTopics: AptTopic[] = [
  {
    id: "time-speed",
    title: "Time, Speed & Distance",
    description:
      "Relates how far an object travels to how fast it moves and for how long. Core to relative-motion, train and boat-stream problems.",
    formula: "Speed = Distance ÷ Time   •   1 km/h = 5/18 m/s",
    questions: [
      {
        q: "A train 150 m long crosses a pole in 15 s. Its speed is:",
        options: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
        answer: 0,
      },
      {
        q: "If a car covers 240 km in 4 hours, average speed is:",
        options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
        answer: 1,
      },
    ],
  },
  {
    id: "percentages",
    title: "Percentages",
    description:
      "A percentage expresses a number as a fraction of 100. Underlies profit-loss, discount and data-interpretation questions.",
    formula: "x% of y = (x/100) × y   •   Change % = (New−Old)/Old × 100",
    questions: [
      {
        q: "20% of 150 is:",
        options: ["25", "30", "35", "45"],
        answer: 1,
      },
      {
        q: "A price rises from 80 to 100. The percentage increase is:",
        options: ["20%", "25%", "30%", "15%"],
        answer: 1,
      },
    ],
  },
  {
    id: "probability",
    title: "Probability",
    description:
      "Measures the likelihood of an event between 0 and 1. Appears in dice, cards and selection-based reasoning.",
    formula: "P(E) = Favourable outcomes ÷ Total outcomes",
    questions: [
      {
        q: "Probability of getting a head on a fair coin toss:",
        options: ["0", "1/4", "1/2", "1"],
        answer: 2,
      },
      {
        q: "Rolling a 6 on a fair die has probability:",
        options: ["1/2", "1/3", "1/6", "1/12"],
        answer: 2,
      },
    ],
  },
];

/* ---------------- INTERVIEW EXPERIENCES ---------------- */
export type InterviewPost = {
  id: string;
  company: string;
  role: string;
  author: string;
  verdict: "Selected" | "Rejected" | "Pending";
  difficulty: Difficulty;
  date: string;
  rounds: number;
  excerpt: string;
  tags: string[];
  likes: number;
};

export const interviewPosts: InterviewPost[] = [
  {
    id: "1",
    company: "Google",
    role: "SDE-1",
    author: "Ananya R.",
    verdict: "Selected",
    difficulty: "Hard",
    date: "Jun 2026",
    rounds: 5,
    excerpt:
      "Two DSA rounds focused on graphs and DP, one system design lite, and a Googleyness round. The trick was talking through brute-force first, then optimising out loud.",
    tags: ["Graphs", "DP", "System Design"],
    likes: 214,
  },
  {
    id: "2",
    company: "Atlassian",
    role: "Backend Engineer",
    author: "Karthik M.",
    verdict: "Selected",
    difficulty: "Medium",
    date: "May 2026",
    rounds: 4,
    excerpt:
      "Heavy on practical coding — they gave a small repo and asked me to extend a rate limiter. Clean code and tests mattered more than fancy algorithms.",
    tags: ["LLD", "Concurrency", "APIs"],
    likes: 156,
  },
  {
    id: "3",
    company: "Razorpay",
    role: "SDE Intern",
    author: "Sneha P.",
    verdict: "Pending",
    difficulty: "Medium",
    date: "Jun 2026",
    rounds: 3,
    excerpt:
      "First round was 2 LeetCode-medium problems on arrays and strings. Second round dived into my projects and SQL joins. Waiting on the final HR call.",
    tags: ["Arrays", "SQL", "Projects"],
    likes: 89,
  },
  {
    id: "4",
    company: "Uber",
    role: "SDE-2",
    author: "Rahul D.",
    verdict: "Rejected",
    difficulty: "Hard",
    date: "Apr 2026",
    rounds: 5,
    excerpt:
      "Got stuck on a tricky sliding-window variant in round 3. Lesson learned: practice the harder window problems and always state your invariant clearly.",
    tags: ["Sliding Window", "Design"],
    likes: 132,
  },
];

/* ---------------- PRACTICE / CONTEST PROBLEMS ---------------- */
export type ProblemStatus = "Solved" | "Attempted" | "Todo";
export type CodeProblem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  acceptance: string;
  statement: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starter: string;
  status?: ProblemStatus;
};

export const practiceProblems: CodeProblem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    status: "Solved",
    tags: ["Array", "Hash Table"],
    acceptance: "52.4%",
    statement:
      "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`. You may assume that each input has exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] == 9, so we return [0, 1].",
      },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "Only one valid answer exists.",
    ],
    starter: `function twoSum(nums, target) {
  // Write your solution here
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    status: "Attempted",
    tags: ["String", "Stack"],
    acceptance: "41.1%",
    statement:
      "Given a string `s` containing just the characters '()[]{}', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets in the correct order.",
    examples: [
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of bracket characters only."],
    starter: `function isValid(s) {
  // Write your solution here
}`,
  },
  {
    id: "best-time-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    status: "Todo",
    tags: ["Array", "DP", "Greedy"],
    acceptance: "55.0%",
    statement:
      "You are given an array `prices` where `prices[i]` is the price of a given stock on the i-th day. Maximise your profit by choosing a single day to buy and a different, later day to sell. Return the maximum profit, or 0 if no profit is possible.",
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 5.",
      },
      { input: "prices = [7,6,4,3,1]", output: "0" },
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    starter: `function maxProfit(prices) {
  // Track the lowest price seen so far
}`,
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    status: "Todo",
    tags: ["Array", "DP", "Divide & Conquer"],
    acceptance: "50.3%",
    statement:
      "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    starter: `function maxSubArray(nums) {
  // Kadane's algorithm
}`,
  },
  {
    id: "merge-two-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    status: "Todo",
    tags: ["Linked List", "Recursion"],
    acceptance: "63.2%",
    statement:
      "You are given the heads of two sorted linked lists `list1` and `list2`. Merge them into one sorted list by splicing together the nodes of the two lists, and return the head of the merged list.",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
    ],
    starter: `function mergeTwoLists(list1, list2) {
  // Use a dummy head and stitch nodes
}`,
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    status: "Todo",
    tags: ["Hash Table", "String", "Sorting"],
    acceptance: "67.8%",
    statement:
      "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An anagram is a word formed by rearranging the letters of another.",
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters.",
    ],
    starter: `function groupAnagrams(strs) {
  // Bucket by sorted-letter key
}`,
  },
];

export const contestProblems: CodeProblem[] = [
  {
    id: "max-subarray",
    title: "A. Maximum Subarray Energy",
    difficulty: "Medium",
    tags: ["DP", "Kadane"],
    acceptance: "—",
    statement:
      "You are given an array of integers representing energy cells. Find the contiguous subarray with the largest sum and return that maximum energy. The subarray must contain at least one element.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    starter: `function maxEnergy(nums) {
  // Contest: optimise for time!
}`,
  },
];

export type ContestStatus = "Live" | "Upcoming" | "Ended";
export type Contest = {
  id: string;
  name: string;
  status: ContestStatus;
  when: string; // human label
  duration: string;
  problems: number;
  participants: number;
  difficulty: Difficulty;
  blurb: string;
};

export const contests: Contest[] = [
  {
    id: "weekly-142",
    name: "Weekly Contest 142",
    status: "Live",
    when: "Live now · ends in 45m",
    duration: "1h 30m",
    problems: 4,
    participants: 1284,
    difficulty: "Medium",
    blurb: "Four fresh problems across arrays, DP and graphs. Climb the live board.",
  },
  {
    id: "biweekly-89",
    name: "Biweekly Contest 89",
    status: "Upcoming",
    when: "Starts in 2 days · Sat 8:00 PM",
    duration: "1h 30m",
    problems: 4,
    participants: 642,
    difficulty: "Medium",
    blurb: "Bi-weekly rated round. Register now to get a reminder before it starts.",
  },
  {
    id: "dp-sprint",
    name: "Dynamic Programming Sprint",
    status: "Upcoming",
    when: "Starts in 5 days · Tue 9:00 PM",
    duration: "2h 00m",
    problems: 5,
    participants: 318,
    difficulty: "Hard",
    blurb: "A themed sprint — every problem is solvable with the right DP state.",
  },
  {
    id: "graph-challenge",
    name: "Graph Theory Challenge",
    status: "Ended",
    when: "Ended · 3 days ago",
    duration: "1h 30m",
    problems: 4,
    participants: 2104,
    difficulty: "Hard",
    blurb: "BFS, DFS, shortest paths and MST. View the editorial and final ranks.",
  },
  {
    id: "weekly-141",
    name: "Weekly Contest 141",
    status: "Ended",
    when: "Ended · 1 week ago",
    duration: "1h 30m",
    problems: 4,
    participants: 1876,
    difficulty: "Medium",
    blurb: "Last week's rated round. Replay the problems in practice mode.",
  },
  {
    id: "string-cup",
    name: "String Mastery Cup",
    status: "Ended",
    when: "Ended · 2 weeks ago",
    duration: "1h 00m",
    problems: 3,
    participants: 1432,
    difficulty: "Easy",
    blurb: "A beginner-friendly cup focused entirely on string patterns.",
  },
];

export type LeaderRow = {
  rank: number;
  user: string;
  solved: number;
  penalty: string;
  score: number;
};

export const leaderboard: LeaderRow[] = [
  { rank: 1, user: "neo_coder", solved: 4, penalty: "1:02:11", score: 400 },
  { rank: 2, user: "byte_wizard", solved: 4, penalty: "1:14:38", score: 392 },
  { rank: 3, user: "algo_anya", solved: 3, penalty: "0:48:02", score: 310 },
  { rank: 4, user: "stack_smith", solved: 3, penalty: "1:09:55", score: 298 },
  { rank: 5, user: "you", solved: 2, penalty: "0:41:20", score: 205 },
  { rank: 6, user: "recursive_raj", solved: 2, penalty: "0:52:47", score: 198 },
  { rank: 7, user: "heap_hannah", solved: 1, penalty: "0:18:09", score: 100 },
];

/* ---------------- DISCUSSION ---------------- */
export type DiscussionPost = {
  author: string;
  time: string;
  votes: number;
  body: string;
};

export const discussion: DiscussionPost[] = [
  {
    author: "byte_wizard",
    time: "3h ago",
    votes: 48,
    body: "Hash map in one pass is the cleanest O(n) approach. Watch out for the same-element-twice edge case — store as you go, not before.",
  },
  {
    author: "algo_anya",
    time: "6h ago",
    votes: 21,
    body: "If the array were sorted you could two-pointer it in O(1) space, but then you lose the original indices. Trade-off worth mentioning in interviews.",
  },
  {
    author: "stack_smith",
    time: "1d ago",
    votes: 9,
    body: "Brute force O(n²) still passes here given the constraints, but always state the optimal out loud.",
  },
];

/* ---------------- COURSES ---------------- */
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type Course = {
  slug: string;
  title: string;
  blurb: string;
  icon: string; // mapped to a lucide icon in CourseCard
  level: CourseLevel;
  lessons: number;
  hours: number;
  price: number; // 0 = free
  rating: number;
  learners: string;
  tag: string;
  instructor: string;
  owned?: boolean;
  progress?: number; // 0-100, only for owned courses
};

export const courses: Course[] = [
  {
    slug: "dsa-mastery",
    title: "DSA Mastery: Patterns to Product Companies",
    blurb:
      "The flagship roadmap — 28 reusable patterns across 1,200+ problems, sequenced exactly the way top product companies test.",
    icon: "ListChecks",
    level: "Intermediate",
    lessons: 120,
    hours: 60,
    price: 2999,
    rating: 4.9,
    learners: "32k",
    tag: "DSA",
    instructor: "Anjali Kumari",
    owned: true,
    progress: 64,
  },
  {
    slug: "30-day-dsa-challenge",
    title: "30-Day DSA Challenge",
    blurb:
      "Anjali's signature challenge — one focused topic a day to build unstoppable consistency before placement season.",
    icon: "Rocket",
    level: "Intermediate",
    lessons: 30,
    hours: 25,
    price: 0,
    rating: 4.8,
    learners: "48k",
    tag: "Challenge",
    instructor: "Anjali Kumari",
    owned: true,
    progress: 40,
  },
  {
    slug: "sql-for-interviews",
    title: "SQL for Interviews",
    blurb:
      "From joins to window functions — problem, best approach and clean query side by side, tuned for data rounds.",
    icon: "Database",
    level: "Beginner",
    lessons: 40,
    hours: 18,
    price: 0,
    rating: 4.7,
    learners: "21k",
    tag: "SQL",
    instructor: "RisingBrain Team",
    owned: true,
    progress: 100,
  },
  {
    slug: "system-design-fundamentals",
    title: "System Design Fundamentals",
    blurb:
      "Scalability, caching, sharding and real architectures — everything you need for the HLD interview round.",
    icon: "Network",
    level: "Advanced",
    lessons: 48,
    hours: 30,
    price: 3499,
    rating: 4.9,
    learners: "14k",
    tag: "System Design",
    instructor: "Anjali Kumari",
  },
  {
    slug: "low-level-design-java",
    title: "Low-Level Design (LLD) in Java",
    blurb:
      "Master OOP, SOLID and design patterns through hands-on machine-coding rounds asked at product companies.",
    icon: "Boxes",
    level: "Advanced",
    lessons: 36,
    hours: 20,
    price: 2499,
    rating: 4.8,
    learners: "9k",
    tag: "LLD",
    instructor: "RisingBrain Team",
  },
  {
    slug: "dynamic-programming-deep-dive",
    title: "Dynamic Programming Deep Dive",
    blurb:
      "Demystify DP with a state-first framework — from memoization basics to the hardest interview favourites.",
    icon: "Cpu",
    level: "Advanced",
    lessons: 50,
    hours: 28,
    price: 1999,
    rating: 4.9,
    learners: "17k",
    tag: "DSA",
    instructor: "Anjali Kumari",
  },
  {
    slug: "aptitude-logical-reasoning",
    title: "Aptitude & Logical Reasoning",
    blurb:
      "Crisp topic theory plus timed MCQ drills to clear the very first placement filter with speed and accuracy.",
    icon: "Calculator",
    level: "Beginner",
    lessons: 55,
    hours: 22,
    price: 0,
    rating: 4.6,
    learners: "27k",
    tag: "Aptitude",
    instructor: "RisingBrain Team",
  },
  {
    slug: "interview-crash-course",
    title: "Interview Crash Course: HR & Behavioral",
    blurb:
      "Nail the behavioral round — STAR stories, resume deep-dives and salary negotiation, in one weekend.",
    icon: "MessageSquareQuote",
    level: "Beginner",
    lessons: 20,
    hours: 6,
    price: 999,
    rating: 4.7,
    learners: "11k",
    tag: "Interview",
    instructor: "Anjali Kumari",
  },
];
