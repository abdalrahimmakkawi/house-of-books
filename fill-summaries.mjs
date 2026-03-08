import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  'https://ulxzyjqmvzyqjynmqywe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseHp5anFtdnp5cWp5bm1xeXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjI5NzI3NiwiZXhwIjoyMDg3ODczMjc2fQ.LlF5YqF9HAfmnYJiOrgthA1vsF_sx3f9gAIs4ckZdyM'
);

// Hardcoded summaries for all books
const hardcodedSummaries = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    short_summary: "Small changes make remarkable results. Build better habits by improving 1% daily through identity-based change and system design.",
    long_summary: "James Clear reveals how tiny changes in behavior lead to remarkable results through the compound effect of atomic habits. The book explains that success comes from building systems and identity-based habits rather than focusing solely on goals. Clear provides practical strategies for making good habits obvious, attractive, easy, and satisfying while breaking bad habits through inversion. The Four Laws of Behavior Change provide a framework for habit formation that works in all areas of life.",
    key_insights: [
      "Small actions compound dramatically over time",
      "Focus on systems over goals",
      "Identity drives behavior change",
      "Make habits obvious and attractive",
      "Environment shapes behavior",
      "1% better daily equals 37x yearly",
      "Consistency beats intensity"
    ]
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    short_summary: "Our minds operate in two systems: fast intuitive thinking and slow deliberate reasoning, leading to predictable cognitive biases.",
    long_summary: "Nobel laureate Daniel Kahneman explores the two systems that drive how we think: System 1 is fast, intuitive, and emotional; System 2 is slow, deliberate, and logical. The book reveals how these systems interact and often lead to cognitive biases and errors in judgment. Kahneman explains concepts like loss aversion, overconfidence, and anchoring effects that affect decision-making. Understanding these mental shortcuts helps us make better choices and avoid common thinking traps.",
    key_insights: [
      "Two systems govern our thinking",
      "Intuition often misleads us",
      "Losses hurt more than gains help",
      "We're overconfident in predictions",
      "Anchoring affects all judgments",
      "Effort depletes mental energy",
      "Recognize biases to improve decisions"
    ]
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    short_summary: "The ability to focus without distraction on cognitively demanding tasks is becoming increasingly valuable and rare in our distracted world.",
    long_summary: "Cal Newport argues that deep work—the ability to focus without distraction on cognitively demanding tasks—is becoming increasingly valuable while also becoming increasingly rare. The book provides strategies for developing deep work habits, structuring your day for maximum productivity, and training your ability to concentrate. Newport explains how to minimize shallow work, create distraction-free environments, and measure your deep work hours. The benefits include improved learning, skill acquisition, and career advancement.",
    key_insights: [
      "Deep work creates value and meaning",
      "Distraction destroys productivity",
      "Schedule deep work blocks daily",
      "Embrace boredom and boredom",
      "Social media reduces deep work capacity",
      "Measure deep work hours weekly",
      "Quality beats quantity in focused work"
    ]
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    short_summary: "How Homo sapiens conquered the world through unique cognitive abilities, collective myths, and agricultural and scientific revolutions.",
    long_summary: "Yuval Noah Harari traces the evolution of Homo sapiens from insignificant animals to rulers of the world. The book explores how cognitive revolution, language, and ability to create shared myths enabled humans to cooperate flexibly in large numbers. Harari examines how agriculture transformed society, money unified people, empires rose and fell, and science brought unprecedented power. The book questions whether progress has made us happier and what the future holds for humanity.",
    key_insights: [
      "Shared myths enable large-scale cooperation",
      "Agriculture was history's biggest fraud",
      "Money is the most successful story",
      "Empires rule through cultural diversity",
      "Science requires acknowledging ignorance",
      "Happiness hasn't increased with progress",
      "Future evolution may be artificial"
    ]
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    short_summary: "A shepherd boy's journey to find treasure reveals that the universe conspires to help those who pursue their personal legends.",
    long_summary: "Paulo Coelho's mystical novel follows Santiago, an Andalusian shepherd boy who dreams of finding treasure in Egypt. His journey teaches him to listen to his heart, recognize omens, and understand the Soul of the World. Through meeting various characters and facing challenges, Santiago learns that true treasure lies in the journey itself. The book explores themes of destiny, personal calling, and the idea that when you want something badly enough, the universe helps you achieve it.",
    key_insights: [
      "Follow your personal legend",
      "The universe conspires to help you",
      "Fear prevents living your dreams",
      "Love never keeps a man from his destiny",
      "Every blessing ignored becomes a curse",
      "The present is God's greatest gift",
      "Treasure lies where you least expect"
    ]
  },
  {
    title: "Mindset",
    author: "Carol Dweck",
    short_summary: "The growth mindset—the belief that abilities can be developed through dedication and hard work—creates success in all areas of life.",
    long_summary: "Carol Dweck's decades of research reveal how our beliefs about our abilities profoundly impact success. People with a growth mindset believe abilities can be developed through effort and learning, while those with a fixed mindset believe abilities are static. The book shows how growth mindset leads to greater achievement, resilience, and enjoyment. Dweck provides strategies for developing growth mindset in parenting, teaching, business, and relationships.",
    key_insights: [
      "Growth mindset creates resilience",
      "Fixed mindset limits potential",
      "Praise effort over intelligence",
      "Challenges are opportunities to grow",
      "Learn from criticism and failure",
      "Success comes from process and effort",
      "Mindset affects all life areas"
    ]
  },
  {
    title: "Essentialism",
    author: "Greg McKeown",
    short_summary: "Less but better. Focus on what truly matters by systematically eliminating everything that doesn't contribute to your goals.",
    long_summary: "Greg McKeown teaches the disciplined pursuit of less but better. Essentialism isn't about getting more done—it's about getting the right things done. The book provides a systematic approach to identifying what's absolutely essential, eliminating everything else, and creating systems to protect your time and energy. McKeown shows how to say no gracefully, cut out non-essentials, and focus your life on the vital few things that bring maximum fulfillment and impact.",
    key_insights: [
      "Less but better is the key",
      "Trade-offs are inevitable",
      "Design your life, don't accept defaults",
      "Say no to everything non-essential",
      "Protect the asset: your energy",
      "Execute against the essentials",
      "Explore many, commit to few"
    ]
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    short_summary: "Creating new things is more valuable than copying existing ones. True innovation comes from going from zero to one, not one to n.",
    long_summary: "Peter Thiel shares unconventional wisdom about entrepreneurship and innovation. The book argues that the greatest gains come from creating something entirely new (zero to one) rather than copying what already exists (one to n). Thiel explores contrarian thinking, the importance of monopoly power, the need for definite optimism, and the seven questions every business must answer. He challenges conventional wisdom about competition, markets, and the future of technology.",
    key_insights: [
      "Competition is for losers",
      "Monopolies drive innovation",
      "Start small and dominate niches",
      "Secrets are the key to success",
      "Definite optimism wins",
      "Technology not globalization matters",
      "Power law dominates venture returns"
    ]
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    short_summary: "Even in the most horrific circumstances, humans can find meaning through their attitude and choice of response to suffering.",
    long_summary: "Viktor Frankl, a Holocaust survivor and psychiatrist, chronicles his experiences in Nazi concentration camps and develops logotherapy—a meaning-centered approach to psychotherapy. The book explores how prisoners who found meaning in their suffering were more likely to survive. Frankl argues that our primary drive is not pleasure but the pursuit of meaning. He presents three ways to find meaning: through work, love, and courage in the face of suffering.",
    key_insights: [
      "Meaning can be found in suffering",
      "Attitude is the last human freedom",
      "Those with purpose survive better",
      "Love provides deepest meaning",
      "Work creates purpose and value",
      "Future orientation gives strength",
      "Logotherapy helps find meaning"
    ]
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    short_summary: "Build-measure-learn loops help entrepreneurs create successful businesses through rapid experimentation and validated learning.",
    long_summary: "Eric Ries revolutionizes entrepreneurship with the lean startup methodology. The book teaches how to build capital-efficient startups through rapid experimentation, validated learning, and iterative product releases. Ries introduces concepts like minimum viable product, pivot or persevere decisions, and actionable metrics. The approach applies to any organization trying to determine what customers want and will pay for, reducing the risk of failure through scientific testing.",
    key_insights: [
      "Build-measure-learn loops work",
      "Minimum viable products test assumptions",
      "Validated learning reduces risk",
      "Pivot or persevere decisions matter",
      "Actionable metrics guide decisions",
      "Innovation accounting tracks progress",
      "Apply lean methods beyond startups"
    ]
  },
  {
    title: "Grit",
    author: "Angela Duckworth",
    short_summary: "Passion and perseverance toward long-term goals—grit—is the key to outstanding achievement in any field.",
    long_summary: "Angela Duckworth's research reveals that grit—a combination of passion and perseverance toward long-term goals—is a better predictor of success than talent. The book explores how gritty people view effort as the path to mastery, live life like a marathon, and maintain hope through adversity. Duckworth provides strategies for developing grit in yourself and others, showing how growth mindset, deliberate practice, and purpose contribute to sustained achievement.",
    key_insights: [
      "Grit beats talent consistently",
      "Passion provides direction and meaning",
      "Perseverance requires daily practice",
      "Hope maintains effort through setbacks",
      "Grit can be developed consciously",
      "Deliberate practice builds skill",
      "Purpose fuels long-term commitment"
    ]
  },
  {
    title: "Outliers",
    author: "Malcolm Gladwell",
    short_summary: "Success depends on context, timing, and accumulated advantages—not just individual merit or talent.",
    long_summary: "Malcolm Gladwell challenges the myth of the self-made person by examining how success is shaped by hidden advantages, extraordinary opportunities, and cultural legacies. The book explores the 10,000-hour rule, the importance of birth timing, cultural attitudes toward work, and the power of accumulated advantages. Gladwell shows how success is less about individual talent and more about the world around us—family, culture, generation, and the idiosyncrasies of growing up.",
    key_insights: [
      "10,000 hours of practice required",
      "Birth timing creates advantages",
      "Culture shapes success patterns",
      "Opportunity matters more than talent",
      "Accumulated advantages compound",
      "Meaningful work provides satisfaction",
      "Success is a collective phenomenon"
    ]
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen Covey",
    short_summary: "Seven timeless principles for personal and professional effectiveness based on character ethics and inside-out transformation.",
    long_summary: "Stephen Covey presents a holistic, integrated approach to personal and interpersonal effectiveness. The seven habits—Be Proactive, Begin with the End in Mind, Put First Things First, Think Win-Win, Seek First to Understand, Synergize, and Sharpen the Saw—form a progression from dependence to independence to interdependence. Covey emphasizes character ethics over personality ethics and principles over practices, showing how to live a principle-centered life.",
    key_insights: [
      "Be proactive not reactive",
      "Begin with the end in mind",
      "Put first things first",
      "Think win-win in relationships",
      "Seek first to understand others",
      "Synergize creates better solutions",
      "Sharpen the saw continuously"
    ]
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    short_summary: "Financial education and building assets—rather than working for money—are the keys to wealth and financial freedom.",
    long_summary: "Robert Kiyosaki contrasts the financial philosophies of his two fathers: his poor dad (highly educated but financially poor) and his rich dad (less educated but financially savvy). The book challenges conventional wisdom about money, teaching that the rich don't work for money—they make money work for them. Kiyosaki explains financial literacy, assets vs. liabilities, cash flow, and the importance of financial intelligence in building wealth.",
    key_insights: [
      "Assets put money in your pocket",
      "Financial education creates wealth",
      "Mind your own business",
      "Work to learn, not for money",
      "Taxes reward business owners",
      "Money is an idea, not reality",
      "Financial intelligence matters most"
    ]
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    short_summary: "Spiritual enlightenment comes from living in the present moment and freeing yourself from the prison of thought.",
    long_summary: "Eckhart Tolle presents a spiritual guide to enlightenment by living in the present moment. The book explains how our identification with our thinking mind creates suffering and prevents us from accessing deeper consciousness. Tolle teaches how to disidentify from thoughts, observe the watcher within, and find the power of presence. The approach combines psychology, spirituality, and practical wisdom to help readers find peace and transformation.",
    key_insights: [
      "Live in the present moment",
      "Thought creates suffering and illusion",
      "Observe the thinker within",
      "Accept what is without resistance",
      "Presence brings peace and power",
      "Pain body feeds on negative emotions",
      "Enlightenment is available now"
    ]
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    short_summary: "Financial success depends more on behavior than intelligence, and how we handle money is shaped by our psychology and experiences.",
    long_summary: "Morgan Housel explores the strange ways people think about money and teaches how to make better financial decisions. The book reveals that financial success is not about what you know but about how you behave. Housel shares short stories about greed, risk, happiness, and contentment, showing how our personal experiences with money shape our decisions more than we realize. Understanding our psychology helps us make better financial choices.",
    key_insights: [
      "Behavior beats intelligence in finance",
      "Personal experiences shape money views",
      "Long-term thinking creates wealth",
      "Risk is what you don't see",
      "Enough is better than more",
      "Compounding requires patience",
      "Financial success is about survival"
    ]
  },
  {
    title: "Daring Greatly",
    author: "Brené Brown",
    short_summary: "Vulnerability is not weakness but the path to courage, connection, and authentic living in a world of scarcity and shame.",
    long_summary: "Brené Brown's research on vulnerability shows that it's the birthplace of innovation, creativity, and change. The book explores how shame prevents us from being vulnerable and authentic, while courage requires embracing uncertainty and emotional exposure. Brown teaches how to develop shame resilience, practice vulnerability, and create wholehearted lives. The approach combines research, storytelling, and practical guidance for living more authentically.",
    key_insights: [
      "Vulnerability creates courage",
      "Shame prevents authentic living",
      "Perfectionism is a 20-ton shield",
      "Courage requires discomfort",
      "Connection requires vulnerability",
      "Wholehearted living embraces imperfection",
      "Daring greatly transforms lives"
    ]
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    short_summary: "Choose what to care about. True happiness comes from embracing problems and choosing values worth struggling for.",
    long_summary: "Mark Manson presents a counterintuitive approach to living a good life by not giving a f*ck about most things. The book argues that happiness comes from solving problems, not avoiding them. Manson teaches readers to choose their values carefully, accept their limitations, and embrace uncertainty and failure. The approach combines humor, profanity, and practical wisdom to help readers focus on what truly matters.",
    key_insights: [
      "Choose your struggles wisely",
      "Problems create meaning",
      "Values guide your choices",
      "Uncertainty is certain",
      "Failure provides feedback",
      "Entitlement destroys happiness",
      "Not caring is selective freedom"
    ]
  },
  {
    title: "Start with Why",
    author: "Simon Sinek",
    short_summary: "Great leaders and organizations inspire action by starting with why—their purpose, cause, or belief—before how and what.",
    long_summary: "Simon Sinek explains how great leaders inspire action by starting with why. The book presents the Golden Circle: why (purpose), how (process), and what (result). Sinek shows that most organizations communicate from outside-in (what-why), but inspiring ones communicate from inside-out (why-what). The approach applies to leadership, marketing, and personal motivation, showing how purpose-driven action creates loyalty and success.",
    key_insights: [
      "Start with why then how then what",
      "Purpose inspires loyalty and action",
      "Why creates emotional connection",
      "What proves your why",
      "Leadership requires purpose",
      "Manipulation vs inspiration",
      "Why drives long-term success"
    ]
  },
  {
    title: "The 4-Hour Workweek",
    author: "Tim Ferriss",
    short_summary: "Escape the 9-to-5, live anywhere, and join the new rich through lifestyle design and automated income.",
    long_summary: "Tim Ferriss challenges traditional work models with strategies for lifestyle design. The book teaches how to eliminate time-wasting activities, focus on high-value activities, create automated income streams, and design your ideal lifestyle. Ferriss presents DEAL: Definition, Elimination, Automation, and Liberation. The approach combines productivity hacks, outsourcing strategies, and unconventional wisdom about work, money, and life design.",
    key_insights: [
      "Design your ideal lifestyle",
      "Eliminate 80% of activities",
      "Automate income streams",
      "Outsource everything possible",
      "Mini-retirements beat retirement",
      "Relative income matters more",
      "Effectiveness trumps efficiency"
    ]
  },
  {
    title: "The Miracle Morning",
    author: "Hal Elrod",
    short_summary: "Transform your life by starting each day with six life-changing practices: silence, affirmations, visualization, exercise, reading, and writing.",
    long_summary: "Hal Elrod presents a system for personal transformation through morning routines. The book introduces SAVERS: Silence (meditation/prayer), Affirmations, Visualization, Exercise, Reading, and Scribing (journaling). Elrod explains how starting each day with these practices creates momentum, clarity, and success. The approach combines personal development, habit formation, and morning routine optimization for life transformation.",
    key_insights: [
      "Morning routine sets daily tone",
      "SAVERS transform lives daily",
      "Consistency creates compound effects",
      "Personal growth requires discipline",
      "First hour predicts day success",
      "Habit stacking builds routines",
      "Accountability increases success"
    ]
  },
  {
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    short_summary: "Value investing principles for achieving superior investment results through margin of safety and market discipline.",
    long_summary: "Benjamin Graham, Warren Buffett's mentor, presents the foundational principles of value investing. The book teaches how to analyze investments, understand market fluctuations, and maintain margin of safety. Graham introduces Mr. Market allegory and the concept of defensive vs. enterprising investors. The approach emphasizes long-term thinking, business-like investing, and avoiding speculation for consistent investment success.",
    key_insights: [
      "Margin of safety protects capital",
      "Mr. Market is manic-depressive",
      "Invest in businesses not stocks",
      "Market timing fails consistently",
      "Value beats growth long-term",
      "Discipline beats emotion",
      "Patience creates wealth"
    ]
  },
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    short_summary: "Fundamental techniques for handling people, making them like you, and winning them to your way of thinking.",
    long_summary: "Dale Carnegie's timeless classic teaches fundamental principles for human relations. The book provides practical techniques for making people like you, winning them to your way of thinking, and leading without offense. Carnegie emphasizes appreciation, listening, and understanding others' perspectives. The approach combines psychology, practical examples, and actionable advice for improving social skills and influence.",
    key_insights: [
      "Make others feel important",
      "Remember and use people's names",
      "Listen more than you talk",
      "Avoid criticism and condemnation",
      "Find common ground quickly",
      "Smile genuinely and often",
      "Appeal to others' interests"
    ]
  },
  {
    title: "The Power of Habit",
    author: "Charles Duhigg",
    short_summary: "Habits shape our lives through cue-routine-reward loops, and understanding this process helps us change bad habits and build good ones.",
    long_summary: "Charles Duhigg explores the science of habit formation and transformation. The book explains the habit loop: cue, routine, reward. Duhigg shows how habits work at individual, organizational, and societal levels. He presents keystone habits that create ripple effects, the golden rule of habit change, and how to identify and modify habits. The approach combines neuroscience, psychology, and practical case studies.",
    key_insights: [
      "Cue-routine-reward drives habits",
      "Keystone habits transform lives",
      "Willpower is like a muscle",
      "Habits create neurological cravings",
      "Small wins build momentum",
      "Environment shapes behavior",
      "Belief enables habit change"
    ]
  },
  {
    title: "The Innovator's Dilemma",
    author: "Clayton Christensen",
    short_summary: "Successful companies fail when they ignore disruptive innovations that initially serve small markets but eventually transform industries.",
    long_summary: "Clayton Christensen explains why great companies can fail despite doing everything right. The book introduces disruptive innovation theory—how new technologies initially serve niche markets but eventually overtake established markets. Christensen shows how listening to customers, focusing on profits, and investing in sustaining technologies can blind companies to disruptive threats. The approach applies to business strategy and innovation management.",
    key_insights: [
      "Disruption starts at the bottom",
      "Good management can cause failure",
      "Customers can't see disruptive needs",
      "Sustaining innovation serves existing markets",
      "Disruptive innovation creates new markets",
      "Capabilities become disabilities",
      "Separate organizations handle disruption"
    ]
  },
  {
    title: "The War of Art",
    author: "Steven Pressfield",
    short_summary: "Overcome resistance—the internal force that prevents us from doing our most important work—and turn pro in our creative endeavors.",
    long_summary: "Steven Pressfield identifies resistance as the enemy of creative work and self-actualization. The book explores how resistance manifests as procrastination, self-doubt, fear, and rationalization. Pressfield teaches how to recognize resistance, turn pro in mindset and action, and do the work regardless of inspiration. The approach combines philosophy, psychology, and practical wisdom for overcoming creative blocks.",
    key_insights: [
      "Resistance prevents creative work",
      "Professionalism defeats resistance",
      "Sit down and do the work",
      "Resistance is universal",
      "Creativity requires discipline",
      "Fear signals important work",
      "Start before you're ready"
    ]
  },
  {
    title: "The Tipping Point",
    author: "Malcolm Gladwell",
    short_summary: "Little things can make big difference when ideas, products, and behaviors spread like viruses through connectors, mavens, and salesmen.",
    long_summary: "Malcolm Gladwell explores how social epidemics work and why some ideas spread while others don't. The book introduces the three rules of epidemics: the Law of the Few (connectors, mavens, salesmen), the Stickiness Factor, and the Power of Context. Gladwell shows how small changes can create dramatic effects when they reach the tipping point. The approach combines social science, psychology, and compelling stories.",
    key_insights: [
      "Connectors spread ideas rapidly",
      "Mavens provide information",
      "Salesmen persuade effectively",
      "Context shapes behavior powerfully",
      "Stickiness determines message impact",
      "Small changes create big effects",
      "Tipping points are predictable"
    ]
  },
  {
    title: "Good to Great",
    author: "Jim Collins",
    short_summary: "Great companies achieve sustained excellence through disciplined people, thought, and action, combined with a culture of discipline and humility.",
    long_summary: "Jim Collins presents research on how companies transition from good to great and sustain greatness. The book identifies seven key characteristics: Level 5 Leadership, First Who Then What, Confront the Brutal Facts, Hedgehog Concept, Culture of Discipline, Technology Accelerators, and the Flywheel Effect. Collins shows how greatness is not a function of circumstance but of conscious choice and discipline.",
    key_insights: [
      "Level 5 leaders blend humility and will",
      "First get the right people",
      "Confront brutal facts",
      "Find your hedgehog concept",
      "Culture of discipline enables freedom",
      "Technology accelerates momentum",
      "Flywheel builds unstoppable momentum"
    ]
  },
  {
    title: "The Blue Ocean Strategy",
    author: "W. Chan Kim and Renée Mauborgne",
    short_summary: "Create uncontested market space by making competition irrelevant through value innovation and strategic canvas reconstruction.",
    long_summary: "W. Chan Kim and Renée Mauborgne present a framework for creating new market space rather than competing in existing markets. The book introduces blue ocean strategy—creating and capturing new demand while making the competition irrelevant. The authors present tools like the Strategy Canvas, Four Actions Framework, and Six Paths Framework for reconstructing market boundaries and creating value innovation.",
    key_insights: [
      "Create new market space",
      "Make competition irrelevant",
      "Value innovation creates demand",
      "Eliminate-reduce-raise-create framework",
      "Strategy canvas maps competition",
      "Blue oceans sustain profits",
      "Reconstruct market boundaries"
    ]
  },
  {
    title: "The E-Myth Revisited",
    author: "Michael E. Gerber",
    short_summary: "Most small businesses fail because owners work in their business rather than on it—treat your business as a system to be replicated.",
    long_summary: "Michael E. Gerber explains why most small businesses fail and how to succeed by working on your business, not in it. The book distinguishes between the Entrepreneur, Manager, and Technician mindsets. Gerber presents the Franchise Prototype concept—systematizing your business so it can run without you. The approach combines business strategy, systems thinking, and practical guidance for entrepreneurial success.",
    key_insights: [
      "Work on your business not in it",
      "Systems create scalability",
      "Entrepreneur, Manager, Technician roles",
      "Franchise prototype enables replication",
      "Business development creates freedom",
      "Documentation builds consistency",
      "Turn-key businesses sell for more"
    ]
  },
  {
    title: "The 5 AM Club",
    author: "Robin Sharma",
    short_summary: "Waking up early and following a morning routine of exercise, reflection, and learning creates extraordinary success and fulfillment.",
    long_summary: "Robin Sharma presents a framework for personal transformation through early morning routines. The book introduces the 20/20/20 formula: 20 minutes of movement, 20 minutes of reflection, and 20 minutes of growth. Sharma shows how waking up at 5 AM and following this routine creates momentum, productivity, and extraordinary results. The approach combines storytelling, practical advice, and morning optimization strategies.",
    key_insights: [
      "5 AM creates golden hours",
      "Morning routine sets success trajectory",
      "20/20/20 formula optimizes mornings",
      "Victim mindset vs. victor mindset",
      "Personal mastery requires consistency",
      "Early hours provide quiet focus",
      "Morning wins create daily wins"
    ]
  },
  {
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    short_summary: "Amoral and often ruthless strategies for gaining and maintaining power, drawn from historical examples and philosophical texts.",
    long_summary: "Robert Greene presents 48 laws of power distilled from historical examples and philosophical texts. The book explores the dynamics of power, manipulation, and social influence through laws like 'Never outshine the master,' 'Conceal your intentions,' and 'Crush your enemy totally.' Greene provides historical examples and practical applications for each law, offering a controversial but insightful guide to power dynamics.",
    key_insights: [
      "Power requires strategic thinking",
      "Appear weak when actually strong",
      "Control information flow",
      "Use absence to increase respect",
      "Reputation is your greatest asset",
      "Master the art of timing",
      "Form independent power bases"
    ]
  },
  {
    title: "The Art of War",
    author: "Sun Tzu",
    short_summary: "Ancient Chinese military strategy emphasizing deception, positioning, and knowing yourself and your enemy to achieve victory without fighting.",
    long_summary: "Sun Tzu's ancient treatise on military strategy presents timeless principles for winning conflicts. The book emphasizes knowing yourself and your enemy, avoiding direct confrontation when possible, using deception, and positioning for advantage. Sun Tzu teaches that supreme excellence consists in breaking the enemy's resistance without fighting. The principles apply to business, politics, and personal conflicts.",
    key_insights: [
      "Know yourself and your enemy",
      "Deception creates advantage",
      "Avoid direct confrontation",
      "Position determines success",
      "Speed and surprise win battles",
      "Adapt strategies to circumstances",
      "Victory without fighting is supreme"
    ]
  },
  {
    title: "The Prince",
    author: "Niccolò Machiavelli",
    short_summary: "Practical guide for rulers on maintaining power through pragmatic, sometimes ruthless, means in a world of political instability.",
    long_summary: "Niccolò Machiavelli presents a realistic approach to political power and leadership. The book advises rulers on how to acquire and maintain power through pragmatic means, including deception, force, and calculated cruelty when necessary. Machiavelli argues that effective leadership sometimes requires actions that conventional morality would condemn. The work remains controversial but influential in political theory.",
    key_insights: [
      "Ends justify means for rulers",
      "Fear is more reliable than love",
      "Appear virtuous, act pragmatically",
      "Fortune favors the bold",
      "Adapt to changing circumstances",
      "Power requires constant vigilance",
      "Effective leadership demands ruthlessness"
    ]
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    short_summary: "Stoic philosophical reflections on duty, mortality, and living virtuously in accordance with nature and reason.",
    long_summary: "Marcus Aurelius' personal journal of Stoic philosophy provides timeless wisdom on living a virtuous life. The Roman emperor reflects on duty, mortality, emotions, and rational action. Meditations teaches how to maintain inner peace despite external circumstances, accept what cannot be changed, and live according to nature and reason. The work remains a foundational text for Stoic philosophy and practical wisdom.",
    key_insights: [
      "Accept what you cannot change",
      "Live according to nature",
      "Reason governs emotions",
      "Death is natural and inevitable",
      "Virtue is the highest good",
      "Inner peace comes from within",
      "Duty guides ethical action"
    ]
  },
  {
    title: "Letters from a Stoic",
    author: "Seneca",
    short_summary: "Practical Stoic guidance on living wisely, dealing with adversity, and maintaining tranquility through reason and virtue.",
    long_summary: "Seneca's letters provide practical Stoic philosophy for everyday life. The correspondence covers topics like dealing with anger, facing death, managing wealth, and maintaining tranquility. Seneca teaches how to live wisely despite external circumstances, control emotions through reason, and prepare for adversity. The letters combine philosophical depth with practical advice for moral living.",
    key_insights: [
      "Prepare for adversity in advance",
      "Wealth doesn't create happiness",
      "Anger destroys rational thinking",
      "Time is our most precious resource",
      "True friendship requires virtue",
      "Death ends only the body",
      "Philosophy guides practical living"
    ]
  },
  {
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    short_summary: "Critique of traditional morality and philosophy, advocating for reevaluation of values and the will to power as life's driving force.",
    long_summary: "Friedrich Nietzsche challenges traditional morality, religion, and philosophy in this critique of Western thought. The book critiques slave morality, herd mentality, and the dichotomy of good and evil. Nietzsche advocates for reevaluation of all values, the will to power as life's driving force, and the creation of new values by the Übermensch. The work remains influential in philosophy and cultural criticism.",
    key_insights: [
      "Morality is a human invention",
      "Will to power drives all action",
      "God is dead, we killed him",
      "Übermensch creates new values",
      "Herd mentality limits greatness",
      "Perspective shapes reality",
      "Beyond good and evil lies freedom"
    ]
  },
  {
    title: "Thus Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    short_summary: "Philosophical novel about the prophet Zarathustra teaching the concept of Übermensch and the death of God.",
    long_summary: "Friedrich Nietzsche's most famous work presents the teachings of the prophet Zarathustra. The book introduces the Übermensch (Overman), the death of God, eternal recurrence, and the will to power. Zarathustra descends from his mountain solitude to share his wisdom with humanity. The poetic and philosophical narrative explores themes of nihilism, meaning, and the transformation of human consciousness.",
    key_insights: [
      "Übermensch transcends humanity",
      "God is dead and we killed him",
      "Eternal recurrence tests life affirmation",
      "Will to power creates meaning",
      "Nihilism follows God's death",
      "Zarathustra teaches self-overcoming",
      "Dance and laughter overcome gravity"
    ]
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    short_summary: "Psychological exploration of guilt, redemption, and moral responsibility through a student's murder of an elderly pawnbroker.",
    long_summary: "Fyodor Dostoevsky's psychological novel follows Raskolnikov, a former student who murders an elderly pawnbroker to test his theory of extraordinary men. The book explores themes of guilt, redemption, free will, and moral responsibility. Raskolnikov's psychological torment and eventual confession lead to spiritual redemption through suffering. The work remains a masterpiece of psychological fiction.",
    key_insights: [
      "Guilt creates psychological torment",
      "Suffering leads to redemption",
      "No one has right to take life",
      "Pride precedes moral fall",
      "Confession brings spiritual relief",
      "Love transforms the sinner",
      "Moral law transcends human theory"
    ]
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    short_summary: "Epic novel exploring Napoleon's invasion of Russia through multiple interconnected families and philosophical reflections on history.",
    long_summary: "Leo Tolstoy's masterpiece follows five aristocratic families during Napoleon's invasion of Russia. The novel intertwines personal stories with historical events, exploring themes of free will vs. determinism, the nature of history, and the search for meaning. Characters like Pierre, Andrei, and Natasha navigate love, war, and spiritual awakening against the backdrop of historical upheaval.",
    key_insights: [
      "History moves beyond individual control",
      "Free will conflicts with determinism",
      "War reveals human nature",
      "Love transcends social barriers",
      "Spiritual seeking brings meaning",
      "Family shapes identity",
      "Peace requires inner transformation"
    ]
  },
  {
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    short_summary: "Tragic story of Anna's forbidden love affair and parallel story of Levin's search for meaning in Russian society.",
    long_summary: "Leo Tolstoy's novel contrasts Anna Karenina's tragic affair with Count Vronsky and Konstantin Levin's search for spiritual meaning. The book explores themes of love, marriage, society, and faith. Anna's story illustrates the consequences of defying social conventions, while Levin's journey represents Tolstoy's own spiritual exploration. The work remains a masterpiece of realist fiction.",
    key_insights: [
      "Society judges harshly",
      "Love requires commitment",
      "Infidelity destroys families",
      "Rural life offers authenticity",
      "Faith provides meaning",
      "Family duty conflicts with passion",
      "Happiness requires moral alignment"
    ]
  },
  {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    short_summary: "Philosophical novel exploring faith, doubt, freedom, and morality through three brothers and their father's murder.",
    long_summary: "Fyodor Dostoevsky's final novel follows the Karamazov brothers—intellectual Ivan, sensual Dmitri, and spiritual Alyosha—and their father's murder. The book explores themes of faith vs. doubt, free will, morality, and the existence of God. The Grand Inquisitor chapter presents a powerful critique of organized religion. The work represents Dostoevsky's ultimate statement on human nature and spirituality.",
    key_insights: [
      "Faith and doubt coexist",
      "Free will requires responsibility",
      "Suffering tests faith",
      "Love redeems humanity",
      "Evil stems from freedom",
      "Spiritual growth requires struggle",
      "Brotherhood reflects divine love"
    ]
  },
  {
    title: "The Stranger",
    author: "Albert Camus",
    short_summary: "Existential novel about an emotionally detached man who commits murder and confronts the absurdity of existence.",
    long_summary: "Albert Camus' existential novel follows Meursault, an emotionally detached Algerian who kills a man and faces execution. The book explores themes of absurdity, alienation, and the meaninglessness of existence. Meursault's refusal to conform to social expectations leads to his condemnation. The work represents Camus' philosophy of the absurd and the human condition.",
    key_insights: [
      "Life is inherently absurd",
      "Society demands emotional conformity",
      "Detachment reveals truth",
      "Death gives life meaning",
      "Freedom requires responsibility",
      "Authenticity defies convention",
      "Absurdity demands revolt"
    ]
  },
  {
    title: "The Plague",
    author: "Albert Camus",
    short_summary: "Allegorical novel about a plague in Oran, exploring human solidarity, suffering, and the absurdity of existence.",
    long_summary: "Albert Camus' allegorical novel depicts a plague in the Algerian city of Oran. The book explores themes of human solidarity, suffering, and the absurd through characters like Dr. Rieux, who fights the plague without understanding its meaning. The plague represents Nazi occupation and human suffering in general. The work presents Camus' philosophy of revolt and human dignity.",
    key_insights: [
      "Solidarity combats suffering",
      "Human dignity persists in crisis",
      "Absurdity requires heroic response",
      "Duty transcends understanding",
      "Suffering unites humanity",
      "Heroism lies in ordinary action",
      "Hope survives despite despair"
    ]
  },
  {
    title: "The Myth of Sisyphus",
    author: "Albert Camus",
    short_summary: "Philosophical essay exploring the absurd, suicide, and the meaning of life through the myth of Sisyphus eternally pushing his boulder.",
    long_summary: "Albert Camus' philosophical essay presents his theory of the absurd—the conflict between human desire for meaning and the meaningless universe. The book explores suicide as a response to absurdity and concludes that we must imagine Sisyphus happy in his eternal task. Camus argues that revolt, freedom, and passion constitute the proper response to the absurd condition.",
    key_insights: [
      "Life is fundamentally absurd",
      "Suicide is not the answer",
      "Revolt defies absurdity",
      "Freedom requires acceptance",
      "Passion gives life intensity",
      "Sisyphus finds meaning in struggle",
      "Consciousness creates value"
    ]
  },
  {
    title: "Being and Time",
    author: "Martin Heidegger",
    short_summary: "Fundamental ontology exploring the meaning of Being through the analysis of human existence (Dasein) and temporality.",
    long_summary: "Martin Heidegger's groundbreaking work explores the question of Being through the analysis of human existence (Dasein). The book examines concepts like Being-in-the-world, temporality, authenticity, and being-towards-death. Heidegger argues that understanding Dasein reveals the meaning of Being itself. The work revolutionized 20th-century philosophy and influenced existentialism, hermeneutics, and postmodern thought.",
    key_insights: [
      "Being reveals through Dasein",
      "Existence precedes essence",
      "Temporality structures consciousness",
      "Authenticity requires death awareness",
      "Being-in-the-world defines existence",
      "Anxiety reveals nothingness",
      "Language is the house of Being"
    ]
  },
  {
    title: "The Republic",
    author: "Plato",
    short_summary: "Socratic dialogue exploring justice, the ideal state, and the philosopher-king through allegories of the cave and divided line.",
    long_summary: "Plato's most famous work presents Socratic dialogues about justice, the ideal state, and the nature of reality. The book introduces the philosopher-king concept, the allegory of the cave, and the theory of Forms. Plato argues that justice in the individual mirrors justice in the state, and that philosophers should rule because they understand the Forms and true reality.",
    key_insights: [
      "Justice mirrors harmony",
      "Philosophers should rule",
      "Forms represent true reality",
      "Cave allegory illustrates ignorance",
      "Education leads to enlightenment",
      "Soul has rational, spirited, appetitive parts",
      "Ideal state reflects human nature"
    ]
  },
  {
    title: "Nicomachean Ethics",
    author: "Aristotle",
    short_summary: "Systematic exploration of virtue, happiness, and the good life through the doctrine of the mean and practical wisdom.",
    long_summary: "Aristotle's ethical work examines virtue, happiness, and the good life. The book presents the doctrine of the mean—virtue as a balance between extremes—and the importance of practical wisdom (phronesis). Aristotle argues that happiness (eudaimonia) comes from living virtuously and fulfilling human potential. The work remains foundational for virtue ethics and moral philosophy.",
    key_insights: [
      "Happiness requires virtue",
      "Virtue lies in the mean",
      "Practical wisdom guides action",
      "Habit shapes character",
      "Friendship completes life",
      "Pleasure accompanies virtue",
      "Contemplation is highest activity"
    ]
  },
  {
    title: "The Analects",
    author: "Confucius",
    short_summary: "Collection of Confucius' teachings on virtue, governance, family, and social harmony through proper conduct and relationships.",
    long_summary: "The Analects collects Confucius' teachings on ethics, governance, and social harmony. The book emphasizes virtue (ren), propriety (li), filial piety, and proper relationships. Confucius teaches that moral cultivation creates harmonious society and effective governance. The work remains foundational for Chinese philosophy and East Asian culture.",
    key_insights: [
      "Virtue creates social harmony",
      "Propriety guides relationships",
      "Filial piety builds society",
      "Lead by moral example",
      "Education cultivates virtue",
      "Golden Rule applies universally",
      "Self-cultivation enables governance"
    ]
  },
  {
    title: "Tao Te Ching",
    author: "Lao Tzu",
    short_summary: "Foundational Taoist text exploring the nature of the Tao, effortless action (wu wei), and harmony with natural flow.",
    long_summary: "Lao Tzu's classic text presents Taoist philosophy through 81 short chapters. The book explores the nature of the Tao (the Way), wu wei (effortless action), and harmony with natural flow. Lao Tzu advocates simplicity, humility, and yielding strength. The work influences Eastern philosophy, martial arts, and modern spirituality with its wisdom about natural living.",
    key_insights: [
      "Tao cannot be named",
      "Wu wei achieves without striving",
      "Yielding overcomes hardness",
      "Simplicity brings clarity",
      "Water exemplifies Tao",
      "Emptiness creates utility",
      "Balance creates harmony"
    ]
  },
  {
    title: "The Art of Happiness",
    author: "Dalai Lama and Howard Cutler",
    short_summary: "Buddhist perspective on finding happiness through compassion, mindfulness, and training the mind.",
    long_summary: "The Dalai Lama and psychiatrist Howard Cutler explore happiness from Buddhist and Western perspectives. The book presents conversations about compassion, mindfulness, suffering, and mental training. The Dalai Lama teaches that happiness comes from inner peace, compassion for others, and understanding the nature of mind. The approach combines Eastern wisdom with Western psychology.",
    key_insights: [
      "Happiness comes from within",
      "Compassion creates joy",
      "Mindfulness reduces suffering",
      "Mental training changes brain",
      "Interdependence connects all",
      "Purpose gives life meaning",
      "Inner peace transcends circumstances"
    ]
  },
  {
    title: "The Way of the Bodhisattva",
    author: "Shantideva",
    short_summary: "Buddhist guide to developing compassion and wisdom on the path to enlightenment for the benefit of all beings.",
    long_summary: "Shantideva's classic text presents the bodhisattva path—developing compassion and wisdom to benefit all beings. The book explores the six perfections: generosity, ethics, patience, effort, concentration, and wisdom. Shantideva teaches techniques for developing bodhicitta (enlightenment mind), overcoming obstacles, and realizing emptiness. The work remains central to Mahayana Buddhism.",
    key_insights: [
      "Compassion awakens enlightenment",
      "Bodhicitta benefits all beings",
      "Six perfections perfect character",
      "Patience transforms anger",
      "Wisdom realizes emptiness",
      "Dedication multiplies merit",
      "All beings possess Buddha nature"
    ]
  },
  {
    title: "The Bhagavad Gita",
    author: "Vyasa",
    short_summary: "Hindu philosophical dialogue between Krishna and Arjuna exploring duty, action, devotion, and the nature of reality.",
    long_summary: "The Bhagavad Gita presents a dialogue between Krishna and Arjuna before battle, exploring duty (dharma), action (karma), devotion (bhakti), and knowledge (jnana). Krishna teaches Arjuna about the nature of reality, the self, and proper action. The text integrates various Hindu philosophical paths and remains influential in Hindu thought and spirituality.",
    key_insights: [
      "Duty transcends personal desire",
      "Action without attachment",
      "Three paths to liberation",
      "Self is eternal, body dies",
      "Divine pervades all existence",
      "Yoga unites individual with divine",
      "Surrender brings liberation"
    ]
  },
  {
    title: "The Dhammapada",
    author: "Anonymous",
    short_summary: "Collection of Buddha's teachings on the path to enlightenment through ethical conduct, meditation, and wisdom.",
    long_summary: "The Dhammapada collects 423 verses of Buddha's teachings on the path to enlightenment. The book covers ethical conduct, meditation, wisdom, and the nature of mind and reality. Buddha teaches how suffering arises from craving and attachment, and how the Noble Eightfold Path leads to liberation. The work remains a foundational text for Buddhist practice and philosophy.",
    key_insights: [
      "Mind precedes all phenomena",
      "Craving creates suffering",
      "Ethical conduct builds foundation",
      "Meditation cultivates insight",
      "Wisdom sees reality clearly",
      "Impermanence characterizes all",
      "Nirvana ends suffering"
    ]
  },
  {
    title: "The Upanishads",
    author: "Anonymous",
    short_summary: "Hindu philosophical texts exploring the nature of Brahman, Atman, and the ultimate reality through meditation and inquiry.",
    long_summary: "The Upanishads represent the philosophical culmination of the Vedas, exploring the nature of ultimate reality (Brahman), the individual self (Atman), and the path to liberation. Through dialogues and meditations, the texts reveal the identity of Atman and Brahman and the means to realize this unity. The work forms the foundation of Vedanta philosophy.",
    key_insights: [
      "Atman equals Brahman",
      "Reality is one, not many",
      "Meditation reveals truth",
      "Knowledge liberates from bondage",
      "Self transcends body and mind",
      "Consciousness is fundamental",
      "Liberation ends rebirth cycle"
    ]
  },
  {
    title: "The I Ching",
    author: "Anonymous",
    short_summary: "Ancient Chinese divination text exploring the patterns of change through 64 hexagrams and their interpretations.",
    long_summary: "The I Ching (Book of Changes) is an ancient Chinese text for divination and understanding the patterns of change. The book presents 64 hexagrams representing different situations and their transformations. Each hexagram includes judgments and line statements for guidance. The work combines cosmology, ethics, and practical wisdom for navigating life's changes.",
    key_insights: [
      "Change is constant and patterned",
      "Yin and yang create balance",
      "Timing determines success",
      "Flexibility adapts to change",
      "Integrity guides action",
      "Moderation creates harmony",
      "Cycles repeat in nature"
    ]
  },
  {
    title: "The Tao of Physics",
    author: "Fritjof Capra",
    short_summary: "Exploration of parallels between modern physics and Eastern mysticism, revealing a new worldview of interconnectedness.",
    long_summary: "Fritjof Capra explores striking parallels between quantum physics and Eastern mysticism. The book examines how modern physics reveals a reality of interconnectedness, dynamism, and participation that mirrors Eastern philosophical insights. Capra argues that science and mysticism are converging on a similar understanding of reality, challenging the mechanistic worldview of classical physics.",
    key_insights: [
      "Physics reveals interconnected reality",
      "Observer affects observation",
      "Eastern mysticism anticipates physics",
      "Matter and energy are one",
      "Universe is fundamentally dynamic",
      "Consciousness participates in reality",
      "New paradigm replaces mechanism"
    ]
  },
  {
    title: "The Holographic Universe",
    author: "Michael Talbot",
    short_summary: "Exploration of holographic theory suggesting that reality is a projection of a deeper order and consciousness shapes physical reality.",
    long_summary: "Michael Talbot explores the holographic model of reality proposed by physicist David Bohm and neuroscientist Karl Pribram. The book examines evidence that the universe may operate like a hologram, where every part contains information about the whole. Talbot discusses paranormal phenomena, consciousness, and the implications of holographic theory for understanding reality and human potential.",
    key_insights: [
      "Reality may be holographic",
      "Consciousness shapes physical world",
      "Separation is illusion",
      "Memory distributed throughout brain",
      "Paranormal phenomena fit holographic model",
      "Nonlocal connections exist",
      "Mind and matter are unified"
    ]
  },
  {
    title: "The Field",
    author: "Lynne McTaggart",
    short_summary: "Exploration of the zero point field as the underlying reality connecting consciousness and the physical universe.",
    long_summary: "Lynne McTaggart explores the zero point field as a fundamental energy field connecting all of reality. The book examines scientific evidence for consciousness affecting physical reality, distant healing, and interconnectedness. McTaggart argues that this field represents a new understanding of the universe where mind and matter are fundamentally connected.",
    key_insights: [
      "Zero point field connects everything",
      "Consciousness affects physical reality",
      "Intention influences matter",
      "Distant healing works through field",
      "Quantum physics reveals interconnectedness",
      "Collective consciousness shapes world",
      "Energy and information are one"
    ]
  },
  {
    title: "The Biology of Belief",
    author: "Bruce Lipton",
    short_summary: "Cell biology reveals that beliefs and thoughts control our biology and genes through epigenetic mechanisms.",
    long_summary: "Bruce Lipton presents cell biology research showing that our beliefs and thoughts control our biology, not our genes. The book explains epigenetics—how environmental signals and perceptions control gene expression. Lipton argues that consciousness, not chemistry, primarily determines our health and well-being, challenging conventional genetic determinism.",
    key_insights: [
      "Beliefs control gene expression",
      "Environment shapes biology",
      "Consciousness affects health",
      "Cells respond to perception",
      "Epigenetics beats genetics",
      "Mind influences body chemistry",
      "Thoughts create biological reality"
    ]
  },
  {
    title: "The Power of Full Engagement",
    author: "Jim Loehr and Tony Schwartz",
    short_summary: "Managing energy rather than time creates high performance and renewal through oscillation between stress and recovery.",
    long_summary: "Jim Loehr and Tony Schwartz present a new approach to high performance based on managing energy rather than time. The book teaches that performance, health, and happiness depend on managing four energy sources: physical, emotional, mental, and spiritual. The authors emphasize oscillation between energy expenditure and recovery, and building positive energy rituals.",
    key_insights: [
      "Energy management beats time management",
      "Oscillation creates sustainability",
      "Four energy sources need balance",
      "Rituals build energy capacity",
      "Recovery enables high performance",
      "Positive rituals create success",
      "Strategic disengagement prevents burnout"
    ]
  },
  {
    title: "The Willpower Instinct",
    author: "Kelly McGonigal",
    short_summary: "Scientific understanding of self-control and willpower as a trainable mind-body response that can be strengthened.",
    long_summary: "Kelly McGonigal presents scientific research on willpower and self-control. The book explains willpower as a mind-body response that can be strengthened through practice. McGonigal provides strategies for improving self-control, understanding temptation, and building willpower habits. The approach combines neuroscience, psychology, and practical exercises for developing willpower.",
    key_insights: [
      "Willpower is trainable",
      "Self-control uses physical energy",
      "Stress depletes willpower",
      "Mindfulness improves self-control",
      "Compassion strengthens willpower",
      "Sleep enhances self-regulation",
      "Habits conserve willpower"
    ]
  },
  {
    title: "The Upside of Stress",
    author: "Kelly McGonigal",
    short_summary: "Stress can be beneficial when viewed as a challenge that builds strength, courage, and meaningful connection.",
    long_summary: "Kelly McGonigal challenges the view that stress is always harmful, presenting research showing that stress can enhance performance, learning, and growth. The book teaches how to change your stress mindset, find meaning in adversity, and use stress as a catalyst for personal development. McGonigal provides strategies for harnessing stress's positive aspects.",
    key_insights: [
      "Stress mindset changes effects",
      "Challenge response builds strength",
      "Tend-and-befriend creates connection",
      "Meaning transforms stress",
      "Growth follows adversity",
      "Post-traumatic growth is real",
      "Stress resilience can be learned"
    ]
  },
  {
    title: "The Joy of Living",
    author: "Yongey Mingyur Rinpoche",
    short_summary: "Buddhist neuroscience approach to happiness through meditation, mindfulness, and understanding the nature of mind.",
    long_summary: "Yongey Mingyur Rinpoche presents Buddhist teachings on happiness and meditation combined with modern neuroscience. The book explains how meditation changes the brain, reduces stress, and increases well-being. Mingyur shares his personal journey from anxiety to peace through meditation, making Buddhist wisdom accessible and scientifically grounded.",
    key_insights: [
      "Meditation rewires the brain",
      "Neuroplasticity enables change",
      "Mindfulness reduces suffering",
      "Awareness transforms emotions",
      "Compassion creates happiness",
      "Restful alertness is natural",
      "Science confirms ancient wisdom"
    ]
  },
  {
    title: "The Wisdom of Insecurity",
    author: "Alan Watts",
    short_summary: "Eastern philosophy perspective on finding peace by accepting insecurity and living in the present moment.",
    long_summary: "Alan Watts explores how the pursuit of security creates anxiety and prevents living fully in the present. The book draws on Eastern philosophy to show how accepting insecurity and impermanence leads to freedom and peace. Watts argues that the present moment is all we ever have, and trying to secure the future destroys our ability to live now.",
    key_insights: [
      "Security seeking creates anxiety",
      "Present moment is all we have",
      "Impermanence is fundamental",
      "Trying to secure future destroys now",
      "Acceptance brings freedom",
      "Ego creates separation",
      "Living requires letting go"
    ]
  },
  {
    title: "The Book of Secrets",
    author: "Deepak Chopra",
    short_summary: "Guide to spiritual enlightenment through understanding consciousness, quantum physics, and ancient wisdom.",
    long_summary: "Deepak Chopra presents 15 secrets for spiritual enlightenment and personal transformation. The book combines quantum physics, ancient wisdom, and practical exercises to help readers expand consciousness, find purpose, and experience miracles. Chopra explores the nature of reality, consciousness, and the path to spiritual awakening.",
    key_insights: [
      "Consciousness creates reality",
      "Quantum physics reveals possibilities",
      "Awareness transforms experience",
      "Intentions shape outcomes",
      "Synchronicity guides life",
      "Spiritual awakening is possible",
      "Miracles are natural"
    ]
  },
  {
    title: "The Celestine Prophecy",
    author: "James Redfield",
    short_summary: "Spiritual adventure about discovering nine insights that reveal the emerging spiritual consciousness and life's purpose.",
    long_summary: "James Redfield's spiritual novel follows a man's journey through Peru discovering nine insights about human consciousness and spiritual evolution. The book presents an emerging worldview where synchronicity, energy awareness, and spiritual growth transform human experience. The insights reveal how humanity is evolving toward higher consciousness and purpose.",
    key_insights: [
      "Synchronicity guides spiritual journey",
      "Energy awareness expands consciousness",
      "Thoughts create energetic reality",
      "Competition gives way to cooperation",
      "Mystical experiences increase",
      "Prayer and intention manifest reality",
      "Spiritual evolution accelerates"
    ]
  },
  {
    title: "The Four Agreements",
    author: "Don Miguel Ruiz",
    short_summary: "Four simple agreements for personal freedom: be impeccable with your word, don't take anything personally, don't make assumptions, always do your best.",
    long_summary: "Don Miguel Ruiz presents four agreements based on ancient Toltec wisdom for personal freedom and happiness. The book teaches how to break self-limiting beliefs and create new agreements that bring love, happiness, and peace. Ruiz explains how these four simple principles can transform your life and relationships.",
    key_insights: [
      "Words create reality",
      "Personal attacks reflect others' reality",
      "Assumptions create suffering",
      "Best effort changes with circumstances",
      "Self-judgment destroys happiness",
      "Impeccability brings power",
      "Freedom comes from new agreements"
    ]
  },
  {
    title: "The Seat of the Soul",
    author: "Gary Zukav",
    short_summary: "Spiritual evolution through authentic power, intention, and emotional awareness beyond the five senses.",
    long_summary: "Gary Zukav explores spiritual evolution and the shift from external power to authentic power. The book teaches how intention, emotional awareness, and alignment with soul create meaningful lives. Zukav explains how we're evolving from five-sensory to multi-sensory beings, and how this transformation changes our understanding of life and purpose.",
    key_insights: [
      "Authentic power comes from within",
      "Intention shapes experience",
      "Emotional awareness enables growth",
      "Multi-sensory perception expands",
      "Soul guides evolution",
      "Responsibility creates freedom",
      "Love is the foundation of existence"
    ]
  },
  {
    title: "The Untethered Soul",
    author: "Michael A. Singer",
    short_summary: "Spiritual guide to freeing yourself from limiting thoughts and emotions by detaching from your inner voice and embracing consciousness.",
    long_summary: "Michael Singer presents a spiritual path to freedom by detaching from your thoughts and emotions. The book teaches how to observe your inner voice without identifying with it, release emotional blockages, and live in a state of relaxed awareness. Singer explains how consciousness is your true nature and how to access it consistently.",
    key_insights: [
      "You are not your thoughts",
      "Observation creates freedom",
      "Consciousness is your true nature",
      "Emotional release heals trauma",
      "Relaxed awareness brings peace",
      "Letting go creates space",
      "Surrender leads to freedom"
    ]
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    short_summary: "Spiritual enlightenment through living in the present moment and freeing yourself from the prison of compulsive thinking.",
    long_summary: "Eckhart Tolle presents a practical guide to spiritual enlightenment by living in the present moment. The book explains how identification with the thinking mind creates suffering and prevents access to deeper consciousness. Tolle teaches how to disidentify from thoughts, observe the watcher within, and find the power of presence for transformation.",
    key_insights: [
      "Present moment contains life",
      "Thinking creates suffering",
      "Observer awareness brings freedom",
      "Acceptance ends resistance",
      "Inner body anchors presence",
      "Pain body feeds on thoughts",
      "Enlightenment is available now"
    ]
  },
  {
    title: "A New Earth",
    author: "Eckhart Tolle",
    short_summary: "Spiritual evolution beyond ego-based consciousness to awakened living and the flowering of human consciousness.",
    long_summary: "Eckhart Tolle explores how humanity is undergoing a spiritual evolution from ego-based consciousness to awakened awareness. The book explains how the ego creates dysfunction and suffering, and how presence and awareness lead to transformation. Tolle presents practical guidance for living in the new consciousness and contributing to planetary awakening.",
    key_insights: [
      "Ego creates suffering and dysfunction",
      "Presence dissolves ego",
      "Consciousness is evolving collectively",
      "Awakening transforms relationships",
      "Inner purpose guides outer purpose",
      "Stillness reveals deeper reality",
      "New earth emerges through awakening"
    ]
  },
  {
    title: "The Secret",
    author: "Rhonda Byrne",
    short_summary: "Law of attraction principles for creating the life you want through thoughts, feelings, and beliefs.",
    long_summary: "Rhonda Byrne presents the law of attraction—how thoughts and feelings attract corresponding experiences. The book teaches how to deliberately create your reality through positive thinking, gratitude, and visualization. Byrne shares wisdom from various teachers about how to manifest wealth, health, relationships, and happiness through the power of attraction.",
    key_insights: [
      "Thoughts become things",
      "Feelings attract matching experiences",
      "Gratitude amplifies abundance",
      "Visualization creates reality",
      "Belief shapes manifestation",
      "Positive energy attracts good",
      "Focus expands what you want"
    ]
  },
  {
    title: "You Can Heal Your Life",
    author: "Louise Hay",
    short_summary: "Mind-body connection showing how thoughts and beliefs create physical health and how to heal through positive thinking.",
    long_summary: "Louise Hay presents the mind-body connection and how thoughts and beliefs affect physical health. The book explains how negative thoughts and emotions create illness, and how affirmations and positive thinking can heal the body. Hay provides specific mental causes for physical ailments and affirmations for healing.",
    key_insights: [
      "Thoughts create physical reality",
      "Beliefs shape health outcomes",
      "Affirmations heal the body",
      "Forgiveness releases disease",
      "Self-love enables healing",
      "Emotions manifest physically",
      "Mind controls body chemistry"
    ]
  },
  {
    title: "The Biology of Belief",
    author: "Bruce Lipton",
    short_summary: "Cell biology revealing that beliefs and thoughts control genes and biology through epigenetic mechanisms.",
    long_summary: "Bruce Lipton presents revolutionary cell biology showing that our beliefs and thoughts control our biology, not our genes. The book explains epigenetics—how environmental signals and perceptions control gene expression. Lipton demonstrates that consciousness, not chemistry, primarily determines our health and well-being.",
    key_insights: [
      "Beliefs control gene expression",
      "Environment shapes biology",
      "Consciousness affects health",
      "Cells respond to perception",
      "Epigenetics beats genetics",
      "Mind influences body chemistry",
      "Thoughts create biological reality"
    ]
  },
  {
    title: "Molecules of Emotion",
    author: "Candace Pert",
    short_summary: "Scientific discovery of how emotions are created by molecules that communicate between mind and body.",
    long_summary: "Candace Pert presents groundbreaking research on how emotions are created by molecules that communicate throughout the body. The book explains how neuropeptides and receptors form an information network linking mind and body. Pert demonstrates how emotions affect health and how the body is the unconscious mind.",
    key_insights: [
      "Emotions are molecular",
      "Body stores emotional memories",
      "Mind and body are one system",
      "Neuropeptides carry information",
      "Unconscious emotions affect health",
      "Healing requires emotional release",
      "Consciousness transforms biology"
    ]
  },
  {
    title: "The Brain that Changes Itself",
    author: "Norman Doidge",
    short_summary: "Neuroplasticity stories showing how the brain can reorganize itself and overcome limitations through thought and action.",
    long_summary: "Norman Doidge presents remarkable stories of neuroplasticity—the brain's ability to change and reorganize itself. The book shows how people overcome stroke, learning disabilities, and other limitations through brain training. Doidge demonstrates that thought and action can physically reshape the brain, challenging the old view of the brain as fixed.",
    key_insights: [
      "Brain can reorganize itself",
      "Thought changes brain structure",
      "Limitations can be overcome",
      "Training creates new pathways",
      "Neuroplasticity continues throughout life",
      "Mind can heal brain damage",
      "Practice rewires neural circuits"
    ]
  },
  {
    title: "The Tell-Tale Brain",
    author: "V.S. Ramachandran",
    short_summary: "Neuroscience exploration of how the brain creates perception, consciousness, and the self through case studies and experiments.",
    long_summary: "V.S. Ramachandran explores the mysteries of the human brain through fascinating case studies and experiments. The book examines how the brain creates perception, consciousness, art, and the self. Ramachandran investigates phenomena like phantom limbs, synesthesia, and autism to reveal how the brain constructs reality and what this tells us about human nature.",
    key_insights: [
      "Brain constructs reality",
      "Perception is active interpretation",
      "Mirror neurons enable empathy",
      "Art reveals brain mechanisms",
      "Self emerges from brain processes",
      "Neurological disorders reveal function",
      "Consciousness has neural basis"
    ]
  },
  {
    title: "Phantoms in the Brain",
    author: "V.S. Ramachandran",
    short_summary: "Neurological mysteries and case studies revealing how the brain creates perception, consciousness, and the self.",
    long_summary: "V.S. Ramachandran explores neurological mysteries through fascinating case studies of patients with unusual brain conditions. The book examines phantom limbs, blindsight, neglect syndrome, and other phenomena to understand how the brain creates perception and consciousness. Ramachandran reveals what these cases teach us about normal brain function and human nature.",
    key_insights: [
      "Brain creates phantom experiences",
      "Perception is constructed reality",
      "Neurological damage reveals function",
      "Consciousness emerges from brain",
      "Self is brain-created narrative",
      "Neurons have specialized functions",
      "Brain fills gaps in perception"
    ]
  },
  {
    title: "The Man Who Mistook His Wife for a Hat",
    author: "Oliver Sacks",
    short_summary: "Neurological case studies exploring how brain disorders reveal the nature of consciousness, identity, and perception.",
    long_summary: "Oliver Sacks presents compelling case studies of patients with neurological disorders that reveal fundamental aspects of human consciousness and identity. The book examines conditions like visual agnosia, Korsakoff's syndrome, and Tourette's to understand how the brain creates reality, memory, and selfhood. Sacks shows both the fragility and resilience of human consciousness.",
    key_insights: [
      "Brain disorders reveal normal function",
      "Identity depends on brain processes",
      "Perception is brain-created",
      "Memory constructs reality",
      "Neurological conditions have meaning",
      "Consciousness requires integration",
      "Human spirit transcends limitations"
    ]
  },
  {
    title: "Awakenings",
    author: "Oliver Sacks",
    short_summary: "True story of catatonic patients awakened by L-DOPA, revealing the nature of consciousness and human identity.",
    long_summary: "Oliver Sacks tells the true story of catatonic patients who survived the 1916-1927 encephalitis epidemic and were awakened decades later by L-DOPA. The book explores what happened when these patients emerged from their frozen states and had to re-enter a world that had moved on without them. Sacks examines the nature of time, consciousness, and human identity.",
    key_insights: [
      "Consciousness can be suspended",
      "Time perception is relative",
      "Identity persists through change",
      "Medicine transforms lives",
      "Human spirit survives adversity",
      "Awakening requires adaptation",
      "Neurology reveals human nature"
    ]
  },
  {
    title: "Musicophilia",
    author: "Oliver Sacks",
    short_summary: "Neurological exploration of how music affects the brain, memory, emotion, and consciousness through various case studies.",
    long_summary: "Oliver Sacks explores the profound relationship between music and the human brain through fascinating case studies. The book examines musical seizures, musical hallucinations, the effects of music on dementia patients, and other phenomena. Sacks reveals what music tells us about the organization of the brain, memory, emotion, and consciousness.",
    key_insights: [
      "Music activates multiple brain areas",
      "Rhythm and melody affect emotion",
      "Music can restore memory",
      "Musical ability is brain-based",
      "Therapy uses music effectively",
      "Brain processes music uniquely",
      "Music reveals brain organization"
    ]
  },
  {
    title: "The Mind's Eye",
    author: "Oliver Sacks",
    short_summary: "Neurological exploration of vision, perception, and consciousness through patients with visual and perceptual disorders.",
    long_summary: "Oliver Sacks explores the nature of vision and perception through patients with various visual and perceptual disorders. The book examines blindness, visual agnosia, face blindness, and other conditions to understand how the brain creates visual reality. Sacks investigates what these cases reveal about consciousness, adaptation, and the human capacity to find meaning.",
    key_insights: [
      "Vision is brain-created",
      "Perception adapts to change",
      "Blindness enhances other senses",
      "Face recognition is specialized",
      "Brain compensates for loss",
      "Visual experience is constructed",
      "Consciousness transcends senses"
    ]
  },
  {
    title: "Hallucinations",
    author: "Oliver Sacks",
    short_summary: "Comprehensive exploration of hallucinations in various conditions, revealing how the brain creates reality and consciousness.",
    long_summary: "Oliver Sacks examines hallucinations across different conditions—migraines, epilepsy, sensory deprivation, drug use, and neurological disorders. The book explores what hallucinations reveal about how the brain creates reality and consciousness. Sacks investigates the similarities between hallucinations and normal perception, and what this tells us about the nature of experience.",
    key_insights: [
      "Hallucinations reveal brain function",
      "Perception and hallucinations overlap",
      "Brain creates reality internally",
      "Sensory deprivation produces visions",
      "Chemicals alter brain reality",
      "Normal perception is constructive",
      "Consciousness is brain-generated"
    ]
  },
  {
    title: "On the Move",
    author: "Oliver Sacks",
    short_summary: "Autobiography exploring Sacks' life as a neurologist, writer, and motorcycle enthusiast, revealing his personal journey and passions.",
    long_summary: "Oliver Sacks' autobiography reveals his remarkable life as a neurologist, writer, and motorcycle enthusiast. The book explores his childhood, medical training, relationships, and professional experiences. Sacks shares his passion for motorcycles, chemistry, and understanding the human brain through his patients' stories. The memoir reveals the man behind the groundbreaking neurological case studies.",
    key_insights: [
      "Personal passion drives professional success",
      "Motorcycles represent freedom",
      "Chemistry leads to neurology",
      "Patients teach about humanity",
      "Writing clarifies thinking",
      "Adventure expands consciousness",
      "Life requires balance and passion"
    ]
  },
  {
    title: "Gratitude",
    author: "Oliver Sacks",
    short_summary: "Reflections on life, death, and gratitude written during Sacks' final months, revealing his acceptance and appreciation of existence.",
    long_summary: "Oliver Sacks' final essays written after his terminal cancer diagnosis. The book reflects on his life, work, relationships, and approaching death with gratitude and acceptance. Sacks shares his appreciation for existence, his patients, and the privilege of consciousness. The essays reveal his wisdom, courage, and deep appreciation for the human experience.",
    key_insights: [
      "Gratitude transforms suffering",
      "Death gives life meaning",
      "Consciousness is precious",
      "Relationships define existence",
      "Work provides purpose",
      "Acceptance brings peace",
      "Life is worth celebrating"
    ]
  },
  {
    title: "Everything Bad Is Good for You",
    author: "Steven Johnson",
    short_summary: "Argument that popular culture (video games, TV, internet) is making people smarter by developing cognitive skills.",
    long_summary: "Steven Johnson argues that modern popular culture is making people smarter, not dumber. The book examines how video games, television, and the internet develop complex cognitive skills like problem-solving, pattern recognition, and social intelligence. Johnson presents evidence that today's media requires more sophisticated mental engagement than previous generations' entertainment.",
    key_insights: [
      "Modern media develops cognitive skills",
      "Video games teach problem-solving",
      "TV narratives grow more complex",
      "Internet enhances social intelligence",
      "Popular culture educates unconsciously",
      "Complexity increases over time",
      "Entertainment trains the mind"
    ]
  },
  {
    title: "Where Good Ideas Come From",
    author: "Steven Johnson",
    short_summary: "Exploration of the environments and patterns that foster innovation and creativity throughout history.",
    long_summary: "Steven Johnson examines where good ideas come from and how innovation happens. The book identifies seven patterns of innovation: the adjacent possible, liquid networks, slow hunch, serendipity, error, exaptation, and platforms. Johnson argues that good ideas emerge from networks and environments that foster connection and collaboration, not from isolated geniuses.",
    key_insights: [
      "Ideas emerge from networks",
      "Liquid networks foster innovation",
      "Slow hunches develop over time",
      "Serendipity requires preparation",
      "Error leads to discovery",
      "Platforms enable combination",
      "Environment shapes creativity"
    ]
  },
  {
    title: "Future Perfect",
    author: "Steven Johnson",
    short_summary: "Argument that decentralized, peer-based approaches are solving problems better than traditional top-down systems.",
    long_summary: "Steven Johnson argues that decentralized, peer-based approaches are solving problems more effectively than traditional top-down systems. The book examines how peer networks, collaborative platforms, and distributed systems are transforming politics, business, and society. Johnson presents examples of how peer progress is creating better solutions to complex problems.",
    key_insights: [
      "Decentralization solves complex problems",
      "Peer networks outperform hierarchies",
      "Collaboration creates better solutions",
      "Distributed systems are resilient",
      "Information sharing accelerates progress",
      "Local knowledge beats centralized control",
      "Peer progress transforms society"
    ]
  },
  {
    title: "The Ghost Map",
    author: "Steven Johnson",
    short_summary: "Story of how John Snow solved the 1854 cholera epidemic in London, pioneering modern epidemiology and urban planning.",
    long_summary: "Steven Johnson tells the story of how Dr. John Snow solved the 1854 cholera epidemic in London by mapping cases and identifying the contaminated water pump. The book explores how this breakthrough pioneered modern epidemiology, urban planning, and data visualization. Johnson examines the intersection of science, cities, and information in solving public health crises.",
    key_insights: [
      "Data visualization reveals patterns",
      "Local knowledge beats assumptions",
      "Cities create disease challenges",
      "Scientific method saves lives",
      "Information networks enable solutions",
      "Urban planning affects health",
      "Epidemiology requires observation"
    ]
  },
  {
    title: "The Invention of Air",
    author: "Steven Johnson",
    short_summary: "Story of Joseph Priestley and the 18th-century scientific revolution that birthed modern chemistry and political thought.",
    long_summary: "Steven Johnson explores the life of Joseph Priestley and the 18th-century scientific revolution. The book examines how Priestley's discovery of oxygen and other gases transformed chemistry, while his political and religious ideas influenced American democracy. Johnson reveals the interconnected networks of science, politics, and philosophy that drove the Enlightenment.",
    key_insights: [
      "Scientific discoveries transform society",
      "Networks accelerate innovation",
      "Interdisciplinary thinking creates breakthroughs",
      "Political and scientific revolutions connect",
      "Atmospheric chemistry changes worldview",
      "Coffee houses foster collaboration",
      "Enlightenment transforms thinking"
    ]
  },
  {
    title: "Emergence",
    author: "Steven Johnson",
    short_summary: "Exploration of how complex systems and intelligence emerge from simple rules and local interactions without central control.",
    long_summary: "Steven Johnson explores emergence—the phenomenon where complex systems and intelligence arise from simple rules and local interactions without central control. The book examines examples like ant colonies, cities, slime molds, and the internet. Johnson shows how bottom-up systems create sophisticated behavior that no individual component could produce alone.",
    key_insights: [
      "Complex behavior emerges from simple rules",
      "Local interactions create global patterns",
      "Bottom-up systems outperform top-down",
      "Self-organization creates intelligence",
      "Cities function like organisms",
      "Internet exemplifies emergence",
      "Decentralization creates resilience"
    ]
  },
  {
    title: "Mind Wide Open",
    author: "Steven Johnson",
    short_summary: "Neuroscience exploration of how brain research is changing our understanding of emotions, decisions, and consciousness.",
    long_summary: "Steven Johnson explores how modern neuroscience is transforming our understanding of the human mind. The book examines brain imaging, neurotransmitters, and the neural basis of emotions, decisions, and consciousness. Johnson shows how brain research is changing everything from marketing to politics while raising important ethical questions about mind manipulation.",
    key_insights: [
      "Brain imaging reveals mental processes",
      "Emotions have neural basis",
      "Decisions happen before awareness",
      "Neuroscience transforms society",
      "Brain chemistry affects behavior",
      "Consciousness emerges from networks",
      "Mind manipulation is possible"
    ]
  },
  {
    title: "Interface Culture",
    author: "Steven Johnson",
    short_summary: "Exploration of how computer interfaces are transforming culture, communication, and human consciousness.",
    long_summary: "Steven Johnson examines how computer interfaces are transforming culture and consciousness. The book traces interface evolution from Victorian novels to modern digital interfaces. Johnson argues that interfaces are becoming the primary way we experience information and reality, fundamentally changing how we think, communicate, and understand the world.",
    key_insights: [
      "Interfaces shape consciousness",
      "Digital design transforms culture",
      "Information architecture matters",
      "User experience determines success",
      "Visual metaphors guide understanding",
      "Interface evolution continues",
      "Technology mediates reality"
    ]
  }
];

// Main function to fill all missing summaries
async function fillMissingSummaries() {
  try {
    console.log('Fetching books from Supabase...');
    
    // Fetch all books
    const { data: books, error: booksError } = await supabase
      .from('books')
      .select('id, title, author')
      .order('title');
    
    if (booksError) {
      console.error('Error fetching books:', booksError);
      return;
    }
    
    console.log(`Found ${books.length} books`);
    
    // Fetch existing summaries
    const { data: existingSummaries, error: summariesError } = await supabase
      .from('summaries')
      .select('book_id');
    
    if (summariesError) {
      console.error('Error fetching summaries:', summariesError);
      return;
    }
    
    const existingBookIds = new Set(existingSummaries?.map(s => s.book_id) || []);
    const missingBooks = books.filter(book => !existingBookIds.has(book.id));
    
    console.log(`Books missing summaries: ${missingBooks.length}`);
    
    if (missingBooks.length === 0) {
      console.log('All books already have summaries!');
      return;
    }
    
    // Process missing books
    for (let i = 0; i < missingBooks.length; i++) {
      const book = missingBooks[i];
      console.log(`Processing book ${i + 1}/${missingBooks.length}: ${book.title}`);
      
      // Find matching hardcoded summary
      const hardcodedSummary = hardcodedSummaries.find(
        summary => summary.title === book.title && summary.author === book.author
      );
      
      if (hardcodedSummary) {
        // Insert into summaries table
        const { error: insertError } = await supabase
          .from('summaries')
          .insert([{
            book_id: book.id,
            short_summary: hardcodedSummary.short_summary,
            long_summary: hardcodedSummary.long_summary,
            key_insights: hardcodedSummary.key_insights
          }]);
        
        if (insertError) {
          console.error(`Error inserting summary for ${book.title}:`, insertError);
        } else {
          console.log(`✅ Successfully added summary for: ${book.title}`);
        }
      } else {
        console.log(`❌ No hardcoded summary found for: ${book.title} by ${book.author}`);
      }
    }
    
    console.log('✅ Summary insertion completed!');
    
  } catch (error) {
    console.error('Error in fillMissingSummaries:', error);
  }
}

// Run the function
fillMissingSummaries();
