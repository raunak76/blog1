/**
 * SafeSphere - Centralized Data Repository
 * Contains comprehensive blog articles, quiz questions, phishing scenarios,
 * emergency checklists, situation guides, and international emergency contacts.
 */

const SafeSphereData = {
  // Comprehensive Safety Blogs Database
  blogs: [
    {
      id: "solo-travel-safety-guide",
      title: "Mastering Solo Travel Safety: The Ultimate Guide for Solo Explorers",
      category: "Personal Safety",
      categorySlug: "personal-safety",
      readTime: "5 min read",
      date: "September 24, 2026",
      author: {
        name: "Dr. Elena Vance",
        role: "Personal Safety Consultant",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80",
      excerpt: "Explore practical strategies for staying secure while exploring new destinations alone, from digital check-ins to confident navigation.",
      likes: 142,
      tags: ["Solo Travel", "Situational Awareness", "Personal Defense", "Travel Tips"],
      content: `
        <h3>1. The Golden Rule: Situational Awareness (Cooper's Color Code)</h3>
        <p>When traveling alone, staying in <strong>Condition Yellow</strong> (relaxed awareness of your surroundings) is your strongest asset. Avoid looking down at maps or your phone constantly. Instead, memorize landmarks and maintain an upright, confident posture.</p>
        
        <div class="blog-callout tip">
          <strong>💡 Pro Tip:</strong> Before heading out, pin your accommodation and key emergency stations on an offline map (like Google Maps Offline or OsmAnd).
        </div>

        <h3>2. Establish a Daily Digital Check-in Protocol</h3>
        <p>Never venture into unfamiliar terrain without an active lifeline. Designate a trusted friend or family member back home as your primary check-in buddy. Share a dynamic location link via WhatsApp or Google Maps, and set a specific curfew time (e.g., 9:00 PM local time) for daily confirmation.</p>

        <h3>3. Smart Accommodation & Room Security</h3>
        <ul>
          <li><strong>Room Level Selection:</strong> When booking hotels, request rooms between the 2nd and 4th floors. First-floor rooms are more vulnerable to intruders, while floors above the 4th may exceed fire department ladder reach.</li>
          <li><strong>Portable Door Jammer:</strong> Carry a lightweight rubber doorstop or portable travel door lock to secure your hotel room from the inside.</li>
          <li><strong>Discreet Inquiries:</strong> Never say your room number loudly at reception or in crowded elevators.</li>
        </ul>

        <h3>4. Blending In and Avoiding Scammer Traps</h3>
        <p>Unsolicited friendliness from strangers offering exclusive deals or currency exchanges often leads to diversion theft. Politely decline and move toward well-lit public zones with security personnel.</p>
      `,
      comments: [
        { id: 1, user: "Aarav Sharma", text: "The portable doorstop tip is brilliant! Never thought about the 2nd-4th floor fire ladder reach either.", date: "2 days ago" },
        { id: 2, user: "Sarah Jenkins", text: "Condition Yellow has saved me countless times in crowded metro stations.", date: "1 day ago" }
      ]
    },
    {
      id: "situational-awareness-basics",
      title: "The Art of Situational Awareness: Spotting Threats Before They Escalate",
      category: "Personal Safety",
      categorySlug: "personal-safety",
      readTime: "4 min read",
      date: "September 20, 2026",
      author: {
        name: "Marcus Thorne",
        role: "Tactical Defense Instructor",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
      excerpt: "Learn how to read body language, recognize baseline anomalies in public places, and trust your subconscious intuition.",
      likes: 98,
      tags: ["Awareness", "Self-Defense", "Psychology", "Urban Safety"],
      content: `
        <h3>Understanding the Baseline</h3>
        <p>Every environment has a natural 'baseline'—the normal pattern of behavior for that specific location at that specific time of day. In a coffee shop, people are working, sipping drinks, or conversing softly. When someone violates this baseline (e.g., watching patrons intently without ordering, constantly glancing toward exits), your intuition registers an anomaly.</p>

        <h3>The OODA Loop in Daily Life</h3>
        <p>Military strategist John Boyd formulated the <strong>OODA Loop</strong>: <em>Observe, Orient, Decide, Act</em>. In personal safety, the faster you complete this cycle, the safer you stay:</p>
        <ol>
          <li><strong>Observe:</strong> Scan entry/exit points whenever you walk into any room or transit hub.</li>
          <li><strong>Orient:</strong> Note where safe zones and cover points exist.</li>
          <li><strong>Decide:</strong> If a situation feels tense, decide on an immediate exit strategy.</li>
          <li><strong>Act:</strong> Leave early rather than waiting to see if things get worse.</li>
        </ol>

        <div class="blog-callout alert">
          <strong>⚠️ Remember:</strong> The best self-defense is not fighting back—it is avoiding the encounter altogether.
        </div>
      `,
      comments: [
        { id: 1, user: "Priya Nair", text: "The baseline concept makes so much sense. We get so distracted by phones that we forget our surroundings.", date: "3 days ago" }
      ]
    },
    {
      id: "essential-road-safety-rules",
      title: "Defensive Driving & Pedestrian Survival: Essential Road Safety Rules",
      category: "Road Safety",
      categorySlug: "road-safety",
      readTime: "6 min read",
      date: "September 18, 2026",
      author: {
        name: "Rajesh Malhotra",
        role: "Traffic Safety Engineer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=900&q=80",
      excerpt: "Master defensive driving techniques, pedestrian blind spots, and why the 3-second rule saves thousands of lives each year.",
      likes: 215,
      tags: ["Road Safety", "Defensive Driving", "Pedestrians", "Vehicle Safety"],
      content: `
        <h3>1. The 3-Second Following Distance Rule</h3>
        <p>Under dry driving conditions, always maintain at least a 3-second gap behind the vehicle ahead. Pick a stationary object (like a bridge or lamppost). When the lead vehicle passes it, count: <em>"One thousand and one, one thousand and two, one thousand and three."</em> If you cross the marker before finishing, ease off the accelerator.</p>
        <p>In wet or foggy conditions, increase this to <strong>5 to 6 seconds</strong>.</p>

        <h3>2. Navigating Heavy Vehicle Blind Spots (The 'No-Zones')</h3>
        <p>Commercial trucks and buses have massive blind spots along their sides, directly behind their trailers, and right in front of their cabs. If you cannot see the truck driver’s face in their side mirror, <strong>they cannot see you</strong>.</p>

        <h3>3. Night-time Pedestrian Visibility</h3>
        <p>Pedestrians wearing dark clothing at night are invisible to drivers until they are within 18 meters (60 feet)—well past braking distance at 50 km/h. Always carry a reflective accessory or turn on your phone flashlight when crossing dimly lit roads.</p>
      `,
      comments: [
        { id: 1, user: "Vikram Mehta", text: "Truck blind spots are terrifying. This should be taught in every high school driving class!", date: "4 days ago" }
      ]
    },
    {
      id: "phishing-and-cyber-scams-guide",
      title: "How to Detect Modern Phishing, Smishing & AI Voice Cloning Scams",
      category: "Cyber Safety",
      categorySlug: "cyber-safety",
      readTime: "5 min read",
      date: "September 15, 2026",
      author: {
        name: "Ananya Iyer",
        role: "Cybersecurity Analyst",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80",
      excerpt: "Deep dive into deceptive emails, urgent SMS messages, deepfake voice scams, and multi-factor authentication best practices.",
      likes: 310,
      tags: ["Cyber Safety", "Phishing", "AI Scams", "Data Privacy", "Passwords"],
      content: `
        <h3>The Anatomy of a Modern Phishing Attack</h3>
        <p>Cybercriminals no longer send obvious emails riddled with spelling errors. Modern phishing leverages high-urgency psychological triggers: <em>"Your account will be suspended within 2 hours,"</em> <em>"Urgent tax refund pending,"</em> or fake package delivery notifications.</p>

        <div class="blog-callout alert">
          <strong>🚨 Golden Security Rule:</strong> Legitimate banks, tax authorities, and government agencies will NEVER ask you for passwords, PINs, or OTPs over phone calls or email links.
        </div>

        <h3>Emerging Threat: AI Voice Cloning (Vishing)</h3>
        <p>Scammers now use 3-second audio clips scraped from social media to clone the voices of family members, calling relatives claiming to be jailed or stranded. Always establish a <strong>"Family Safe Word"</strong> that only your household knows to verify emergencies immediately.</p>

        <h3>Actionable Cyber Defense Checklist:</h3>
        <ul>
          <li>Use an authenticator app (TOTP) instead of SMS-based 2FA whenever possible.</li>
          <li>Never click links inside unverified SMS messages (Smishing). Open the official app directly.</li>
          <li>Inspect sender domains carefully: <code>support@paypal-security-update.com</code> is NOT <code>paypal.com</code>.</li>
        </ul>
      `,
      comments: [
        { id: 1, user: "Rohan Das", text: "The Family Safe Word concept is genius! Setting one up with my parents tonight.", date: "5 days ago" }
      ]
    },
    {
      id: "password-security-and-mfa",
      title: "Beyond 'Password123': Crafting Uncrackable Passphrases and Zero-Trust Vaults",
      category: "Cyber Safety",
      categorySlug: "cyber-safety",
      readTime: "4 min read",
      date: "September 12, 2026",
      author: {
        name: "Ananya Iyer",
        role: "Cybersecurity Analyst",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=900&q=80",
      excerpt: "Why length beats complexity, how brute-force GPU cracking works, and how to configure a modern password manager.",
      likes: 180,
      tags: ["Passwords", "Cybersecurity", "Zero Trust", "Encryption"],
      content: `
        <h3>Why Passphrases Beat Complex Passwords</h3>
        <p>A short complex password like <code>Tr0ub4dor&3</code> can be cracked much faster than a four-word random passphrase like <code>correct-horse-battery-staple</code>. Entropy scales exponentially with character length.</p>
        <p>Modern GPU clusters can test billions of combinations per second. Aim for <strong>16+ characters</strong> using memorable, disconnected words.</p>

        <h3>Three Non-Negotiable Cyber Habits:</h3>
        <ol>
          <li><strong>Never reuse passwords</strong> across multiple services. A single leak compromises all your accounts.</li>
          <li><strong>Adopt a Password Manager</strong> (such as Bitwarden, 1Password, or KeePassXC) with biometric unlocking.</li>
          <li><strong>Check Breach Records:</strong> Check your email addresses on <em>haveibeenpwned.com</em> every quarter.</li>
        </ol>
      `,
      comments: []
    },
    {
      id: "emergency-preparedness-checklist-guide",
      title: "The 72-Hour Emergency Survival Kit: Complete Go-Bag Blueprint",
      category: "Emergency Preparedness",
      categorySlug: "emergency-prep",
      readTime: "7 min read",
      date: "September 09, 2026",
      author: {
        name: "Capt. David Miller",
        role: "Disaster Response Specialist",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=900&q=80",
      excerpt: "Step-by-step instructions to pack an airtight 72-hour survival Go-Bag for power outages, evacuations, and natural disasters.",
      likes: 275,
      tags: ["Emergency Kit", "Disaster Readiness", "Survival Gear", "First Aid"],
      content: `
        <h3>Why 72 Hours Matters</h3>
        <p>In major regional disasters, emergency responders often take between 48 to 72 hours to reach every affected neighborhood. Your household must be self-sufficient during this crucial window.</p>

        <h3>Core Go-Bag Components</h3>
        <ul>
          <li><strong>Water:</strong> 4 liters (1 gallon) per person per day for drinking and sanitation. Include water purification tablets.</li>
          <li><strong>Food:</strong> Non-perishable, high-calorie food bars, dried fruits, and ready-to-eat meals.</li>
          <li><strong>Light & Power:</strong> Hand-crank or solar emergency radio with USB charger, tactical flashlight with spare batteries.</li>
          <li><strong>Medical:</strong> Comprehensive First Aid Kit, tourniquet, 7-day prescription medications, N95 masks.</li>
          <li><strong>Documents:</strong> Waterproof pouch containing copies of passports, IDs, insurance policies, and cash in small denominations.</li>
        </ul>
      `,
      comments: [
        { id: 1, user: "Sunita Rao", text: "Printed this out and kept it with my family first aid box. Excellent detail!", date: "1 week ago" }
      ]
    },
    {
      id: "campus-and-hostel-safety-guide",
      title: "Campus & Hostel Safety 101: Essential Advice for University Students",
      category: "Campus Safety",
      categorySlug: "campus-safety",
      readTime: "5 min read",
      date: "September 05, 2026",
      author: {
        name: "Kavya Patel",
        role: "Student Welfare Advisor",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
      excerpt: "Practical campus survival tips covering late-night library walks, hostel electrical fire precautions, and reporting harassment.",
      likes: 165,
      tags: ["Campus Safety", "College Life", "Hostel Safety", "Student Well-being"],
      content: `
        <h3>1. Night-Time Campus Transit</h3>
        <p>Always utilize campus security escort vans or walk in groups when returning from late-night study sessions. Stick to primary illuminated walkways and avoid shortcuts through unlit athletic fields or construction zones.</p>

        <h3>2. Room and Hostel Fire Prevention</h3>
        <p>Hostel rooms are notorious for overloaded power strips. Never daisy-chain extension cords or leave high-wattage appliances (immersion rods, induction heaters) plugged in unattended.</p>

        <h3>3. Active Campus Red Flags</h3>
        <p>Program your university's campus security control room number into your phone's speed dial (not just national emergency numbers). Know the locations of campus emergency blue-light poles.</p>
      `,
      comments: []
    },
    {
      id: "earthquake-and-fire-safety-protocol",
      title: "Drop, Cover & Hold On: Real Protocols for Earthquakes and High-Rise Fires",
      category: "Disaster Safety",
      categorySlug: "disaster-safety",
      readTime: "6 min read",
      date: "August 30, 2026",
      author: {
        name: "Capt. David Miller",
        role: "Disaster Response Specialist",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=900&q=80",
      excerpt: "Debunking common disaster myths like the 'Triangle of Life' and mastering the correct Drop, Cover, and Hold On technique.",
      likes: 240,
      tags: ["Earthquake", "Fire Safety", "Evacuation", "Disaster Response"],
      content: `
        <h3>Earthquake: Drop, Cover, and Hold On</h3>
        <p>Scientific studies show that running outside during an earthquake exposes you to falling glass, masonry, and architectural facade collapse. Instead:</p>
        <ol>
          <li><strong>DROP</strong> to your hands and knees to prevent being knocked over.</li>
          <li><strong>COVER</strong> your head and neck under a sturdy table or desk.</li>
          <li><strong>HOLD ON</strong> to your shelter until the shaking completely stops.</li>
        </ol>

        <div class="blog-callout alert">
          <strong>🔥 Fire in High-Rise:</strong> NEVER use elevators. Feel doors with the back of your hand before opening. If smoke is present, stay low to the floor where breathable oxygen remains.
        </div>
      `,
      comments: [
        { id: 1, user: "Emily Watson", text: "Debunking the doorway myth was so important. Thank you SafeSphere!", date: "2 weeks ago" }
      ]
    },
    {
      id: "social-media-privacy-safety",
      title: "Digital Footprint Lockdown: Protecting Yourself from Doxxing & Stalking",
      category: "Cyber Safety",
      categorySlug: "cyber-safety",
      readTime: "5 min read",
      date: "August 25, 2026",
      author: {
        name: "Ananya Iyer",
        role: "Cybersecurity Analyst",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
      excerpt: "How metadata in photos, live check-ins, and public relationship tags enable digital stalking—and how to lock your accounts down.",
      likes: 195,
      tags: ["Privacy", "Social Media", "Anti-Stalking", "Metadata"],
      content: `
        <h3>1. The Danger of EXIF Metadata</h3>
        <p>Every photo taken on a smartphone embeds hidden metadata: exact GPS coordinates, timestamp, and camera model. While major platforms strip EXIF data, sending photos directly via messaging apps or cloud links may expose your exact apartment address.</p>

        <h3>2. The 'Delayed Posting' Strategy</h3>
        <p>Avoid posting real-time stories that reveal your current physical location (cafes, airports, concerts). Post memories <em>after</em> you have safely departed the venue.</p>
      `,
      comments: []
    },
    {
      id: "flood-and-extreme-weather-survival",
      title: "Flash Floods and Extreme Weather: The Vehicle Escape Protocol",
      category: "Disaster Safety",
      categorySlug: "disaster-safety",
      readTime: "5 min read",
      date: "August 20, 2026",
      author: {
        name: "Capt. David Miller",
        role: "Disaster Response Specialist",
        avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=900&q=80",
      excerpt: "What to do if your car stalls in rising floodwater, how to break automotive tempered glass, and flood zone navigation rules.",
      likes: 160,
      tags: ["Flash Floods", "Monsoon Safety", "Vehicle Escape", "Weather Alert"],
      content: `
        <h3>Turn Around, Don't Drown</h3>
        <p>Just <strong>15 cm (6 inches)</strong> of fast-moving water can knock an adult off their feet. <strong>30 cm (12 inches)</strong> of water will float most small cars, and <strong>60 cm (2 feet)</strong> will sweep away SUVs and trucks.</p>

        <h3>Escaping a Submerged Vehicle</h3>
        <p>Remember the acronym <strong>S-W-C-O</strong>:</p>
        <ol>
          <li><strong>Seatbelts:</strong> Unbuckle immediately.</li>
          <li><strong>Windows:</strong> Open windows before water reaches electronic switches.</li>
          <li><strong>Children:</strong> Unbuckle and push children out first.</li>
          <li><strong>Out:</strong> Climb out through the open window onto the vehicle roof.</li>
        </ol>
      `,
      comments: []
    },
    {
      id: "helmet-seatbelt-awareness",
      title: "The Physics of Impact: Why Proper Helmets and Seatbelts Save Lives",
      category: "Road Safety",
      categorySlug: "road-safety",
      readTime: "4 min read",
      date: "August 15, 2026",
      author: {
        name: "Rajesh Malhotra",
        role: "Traffic Safety Engineer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
      excerpt: "Understanding deceleration trauma, certified helmet ratings (DOT, ECE, ISI), and rear-passenger seatbelt laws.",
      likes: 188,
      tags: ["Helmets", "Seatbelts", "Motorcycle Safety", "Accident Prevention"],
      content: `
        <h3>The Hidden Danger of Unstrapped Rear Passengers</h3>
        <p>In a frontal collision at 50 km/h, an unrestrained backseat passenger becomes a 3-ton human projectile, severely injuring or killing front-seat occupants. Always enforce 100% seatbelt usage in all seats.</p>

        <h3>Choosing Certified Motorcycle Helmets</h3>
        <p>Look for genuine certifications (DOT, ECE 22.06, or ISI marks). Avoid novelty half-helmets that provide zero chin or temporal bone protection in high-speed skids.</p>
      `,
      comments: []
    },
    {
      id: "mental-health-and-panic-control",
      title: "Mastering Panic Control: Breathing Techniques to Stay Grounded in Crises",
      category: "Personal Safety",
      categorySlug: "personal-safety",
      readTime: "4 min read",
      date: "August 10, 2026",
      author: {
        name: "Dr. Elena Vance",
        role: "Personal Safety Consultant",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
      excerpt: "Physiological sighing, box breathing, and tactical mental anchors to overcome acute adrenaline paralysis in emergencies.",
      likes: 210,
      tags: ["Mental Health", "Panic Control", "Tactical Breathing", "Crisis Management"],
      content: `
        <h3>The Amygdala Hijack</h3>
        <p>During sudden danger, your sympathetic nervous system triggers intense adrenaline surges, narrowing your visual field (tunnel vision) and impairing rational decision-making.</p>
        
        <h3>The Box Breathing Protocol (4-4-4-4)</h3>
        <p>Used by emergency first responders and elite operators to regain rapid physiological control:</p>
        <ul>
          <li>Inhale through nose for 4 seconds</li>
          <li>Hold breath for 4 seconds</li>
          <li>Exhale through mouth for 4 seconds</li>
          <li>Hold empty for 4 seconds</li>
        </ul>
      `,
      comments: []
    }
  ],

  // Categories Definition
  categories: [
    {
      name: "Personal Safety",
      slug: "personal-safety",
      icon: "shield-user",
      color: "#3b82f6",
      desc: "Solo travel precautions, situational awareness, self-defense basics, and student safety.",
      count: 3
    },
    {
      name: "Road Safety",
      slug: "road-safety",
      icon: "car-crash",
      color: "#f59e0b",
      desc: "Defensive driving, pedestrian protection, helmet standards, and night road survival.",
      count: 2
    },
    {
      name: "Cyber Safety",
      slug: "cyber-safety",
      icon: "shield-lock",
      color: "#8b5cf6",
      desc: "Anti-phishing, password hygiene, AI voice scam detection, and social media privacy.",
      count: 3
    },
    {
      name: "Emergency Preparedness",
      slug: "emergency-prep",
      icon: "first-aid",
      color: "#ef4444",
      desc: "72-hour Go-Bags, evacuation planning, medical kits, and crisis response blueprints.",
      count: 1
    },
    {
      name: "Campus Safety",
      slug: "campus-safety",
      icon: "school",
      color: "#10b981",
      desc: "University dorm protocols, late night transit, reporting unsafe incidents, and harassment.",
      count: 1
    },
    {
      name: "Disaster Safety",
      slug: "disaster-safety",
      icon: "alert-triangle",
      color: "#06b6d4",
      desc: "Earthquake response, flash flood vehicle escapes, high-rise fires, and storm shelters.",
      count: 2
    }
  ],

  // Daily Rotating Safety Tips
  safetyTips: [
    {
      id: 1,
      category: "Personal Safety",
      tip: "Keep one earbud out or use ambient sound mode when walking alone outdoors at night to remain fully aware of approaching footsteps or vehicles.",
      author: "SafeSphere Field Advice"
    },
    {
      id: 2,
      category: "Cyber Safety",
      tip: "If a text message claims your bank account is locked, never click the attached link. Open your bank's official app or call the number on the back of your card.",
      author: "National Cyber Security Center"
    },
    {
      id: 3,
      category: "Road Safety",
      tip: "Before opening your parked car door into traffic or bike lanes, use the 'Dutch Reach' (reach with the far hand across your body) to force your head to look back for oncoming cyclists.",
      author: "Traffic Safety Standards"
    },
    {
      id: 4,
      category: "Emergency Prep",
      tip: "Store water bottles in dark, cool areas and rotate tap-filled containers every six months to prevent bacteria build-up.",
      author: "Red Cross Guidelines"
    },
    {
      id: 5,
      category: "Disaster Safety",
      tip: "If trapped in a burning room, seal the door cracks with wet towels or clothes to block toxic carbon monoxide smoke until firefighters arrive.",
      author: "Fire Safety Board"
    },
    {
      id: 6,
      category: "Campus Safety",
      tip: "Program your university campus security helpline as a speed dial contact on your smartphone lock screen widget.",
      author: "Campus Welfare Committee"
    }
  ],

  // Interactive Safety IQ Quiz
  quizQuestions: [
    {
      id: 1,
      category: "Personal Safety",
      question: "You are walking home at night and suspect someone has been following you for two blocks. What is the safest immediate action?",
      options: [
        "Confront the person directly and demand why they are following you",
        "Cross the street, head immediately toward a well-lit open business (like a store or petrol pump), and call for help",
        "Run quickly into a dark, unlit shortcut alleyway to lose them",
        "Put your headphones on and pretend you didn't notice them"
      ],
      correctAnswer: 1,
      explanation: "Heading into a crowded, well-lit commercial establishment eliminates the attacker's element of isolation and gives you immediate witnesses and phone access."
    },
    {
      id: 2,
      category: "Cyber Safety",
      question: "Which of the following makes the strongest and most resilient master password/passphrase?",
      options: [
        "P@$$w0rd2026",
        "Elephant#Purple#Tango#Bicycle99",
        "MyBirthdate1998!",
        "admin_qwerty_123"
      ],
      correctAnswer: 1,
      explanation: "A four-word random passphrase with punctuation and length exceeds 30 characters, providing massive entropy that resists GPU brute-force dictionaries for centuries."
    },
    {
      id: 3,
      category: "Road Safety",
      question: "What is the recommended safe following distance behind another vehicle under normal, dry highway conditions?",
      options: [
        "1 second",
        "At least 3 seconds",
        "Exactly 1 car length for every 50 km/h",
        "Half a second"
      ],
      correctAnswer: 1,
      explanation: "The 3-second rule provides adequate reaction time (1.5s perception-reaction + 1.5s physical braking cushion) at standard highway speeds."
    },
    {
      id: 4,
      category: "Disaster Safety",
      question: "During a severe earthquake while inside an office building, what is the safest procedure?",
      options: [
        "Sprint toward the elevator to get to ground level fast",
        "Stand under an open doorway or run out onto the balcony",
        "Drop to hands and knees, take Cover under a sturdy desk, and Hold On",
        "Climb onto the roof of the building"
      ],
      correctAnswer: 2,
      explanation: "The 'Drop, Cover, and Hold On' protocol prevents injuries from falling ceiling tiles, broken window shards, and structural debris."
    },
    {
      id: 5,
      category: "Emergency Prep",
      question: "How much drinking water should you store per person per day in a household 72-hour emergency Go-Bag?",
      options: [
        "500 ml (half a bottle)",
        "1 liter",
        "Approximately 3 to 4 liters (1 gallon)",
        "10 liters"
      ],
      correctAnswer: 2,
      explanation: "Health agencies recommend 1 gallon (3.8L) per person per day—half for direct hydration and half for basic hygiene and food preparation."
    },
    {
      id: 6,
      category: "Cyber Safety",
      question: "You receive an SMS: 'Your courier package is on hold due to missing address info. Click https://fedx-pkg-track-verify.xyz to update.' What should you do?",
      options: [
        "Click the link immediately and enter your credit card to verify identity",
        "Reply STOP with your phone number",
        "Recognize it as smishing/phishing, ignore and report the number, and check your official courier app directly",
        "Forward the message to all your contacts to warn them"
      ],
      correctAnswer: 2,
      explanation: "The suspicious URL (.xyz domain, hyphenated name) and urgent tone are textbook smishing hallmarks designed to steal payment data."
    }
  ],

  // Phishing Simulator Scenarios
  phishingScenarios: [
    {
      id: "phish-1",
      sender: "security-alert@acc0unt-update-google.com",
      subject: "URGENT: Unauthorized Login Detected on your Account",
      date: "Today, 10:14 AM",
      body: `
        <div style="font-family: sans-serif; padding: 10px;">
          <p>Dear Valued User,</p>
          <p>We detected an unauthorized sign-in attempt from <strong>IP 194.26.29.112 (Moscow, Russia)</strong> on your SafeSphere account.</p>
          <p>To prevent immediate suspension within <strong>1 hour</strong>, you must verify your identity and credentials below:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="#" class="demo-phish-btn" style="background: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">VERIFY ACCOUNT CREDENTIALS NOW</a>
          </div>
          <p style="font-size: 12px; color: #6b7280;">Google Security Support Team • 1600 Amphitheatre Pkwy</p>
        </div>
      `,
      isPhishing: true,
      redFlags: [
        "Spoofed sender domain ('acc0unt-update-google.com' with zero instead of 'o')",
        "Extreme artificial urgency ('suspension within 1 hour')",
        "Direct link asking for login credentials verification"
      ],
      safeAction: "Never click the red button. Go directly to google.com/security to check account activity."
    },
    {
      id: "phish-2",
      sender: "billing@netflix.com",
      subject: "Your monthly invoice for September 2026",
      date: "Yesterday, 3:45 PM",
      body: `
        <div style="font-family: sans-serif; padding: 10px;">
          <p>Hi SafeSphere Member,</p>
          <p>Your payment of $15.99 for your Premium Ultra HD plan was successfully processed on September 27, 2026.</p>
          <p>You can view your detailed billing history by signing in to your account at netflix.com/youraccount.</p>
          <p style="font-size: 12px; color: #6b7280;">Netflix International B.V. • No reply is needed.</p>
        </div>
      `,
      isPhishing: false,
      redFlags: [
        "Sender address is legitimate (@netflix.com)",
        "No threatening language or urgent demands",
        "Does not pressure you to click suspicious links or enter passwords"
      ],
      safeAction: "This is a standard transactional receipt. No defensive action needed."
    },
    {
      id: "phish-3",
      sender: "rewards-claim@pay-tm-cashback-bonus.co",
      subject: "🎉 You have won ₹4,500 Festival Cashback Voucher!",
      date: "Today, 12:05 PM",
      body: `
        <div style="font-family: sans-serif; padding: 10px;">
          <h3 style="color: #059669;">Congratulations! 🎊</h3>
          <p>Your UPI mobile number has been selected for the Grand Festival Cash Bonus.</p>
          <p>To transfer ₹4,500 directly into your bank account, click below and enter your UPI PIN:</p>
          <div style="text-align: center; margin: 15px 0;">
            <a href="#" class="demo-phish-btn" style="background: #059669; color: white; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-weight: bold;">CLAIM ₹4,500 UPI REWARD</a>
          </div>
          <p style="font-size: 11px; color: #ef4444;">*Offer expires in 14 minutes!</p>
        </div>
      `,
      isPhishing: true,
      redFlags: [
        "Requests UPI PIN (UPI PIN is ONLY entered to SEND money, never to receive money)",
        "Fake sub-domain pretending to be Paytm/GPay",
        "14-minute fake countdown timer"
      ],
      safeAction: "Block the sender and report to cybercrime portal (1930 / cybercrime.gov.in)."
    }
  ],

  // Situation-Based "What Should I Do?" Guide
  situations: [
    {
      id: "stalked-or-followed",
      title: "Being Followed on Foot at Night",
      icon: "eye-off",
      category: "Personal Safety",
      threatLevel: "High Threat",
      threatColor: "#ef4444",
      immediateSteps: [
        "Do NOT go directly to your home (don't reveal where you live).",
        "Cross the street deliberately. If the person also crosses, your suspicion is confirmed.",
        "Change direction toward a brightly lit store, restaurant, or hotel lobby with staff and cameras.",
        "Take your phone out and pretend or actually call someone: 'I am right outside the station, meeting you now.'",
        "If they approach, make loud noise, yell 'BACK OFF!', and press emergency SOS siren."
      ],
      dos: ["Stay in well-lit public zones", "Keep hands free and posture confident", "Call local police (112/911/100)"],
      donts: ["Don't put earphones on", "Don't run into dead-end or dark alleys", "Don't hide in quiet stairwells"]
    },
    {
      id: "car-flood-stall",
      title: "Vehicle Stalled in Rising Water",
      icon: "waves",
      category: "Disaster Safety",
      threatLevel: "Critical Threat",
      threatColor: "#dc2626",
      immediateSteps: [
        "Unbuckle all seatbelts immediately before water pressure builds against doors.",
        "Lower your electric windows RIGHT AWAY before car electronics short-circuit.",
        "If windows won't open, use an emergency window breaker on the corner of the side window (not front windshield).",
        "Climb out onto the car roof and signal for emergency rescue.",
        "If current is strong, do NOT attempt to wade through water higher than your shins."
      ],
      dos: ["Abandon car if water level rises quickly", "Keep life jackets or floating items if present", "Call emergency line with exact location"],
      donts: ["Don't stay inside a submerging car waiting for tow truck", "Don't attempt to start engine", "Don't touch downed power cables in water"]
    },
    {
      id: "cyber-blackmail-sextortion",
      title: "Cyber Extortion / Impersonation Scam",
      icon: "lock-alert",
      category: "Cyber Safety",
      threatLevel: "Moderate Threat",
      threatColor: "#f59e0b",
      immediateSteps: [
        "Do NOT pay any money or cryptocurrency (paying only invites repeated extortion demands).",
        "Take clear screenshots of all messages, timestamps, phone numbers, and profile URLs for evidence.",
        "Immediately block the perpetrator on all social media platforms.",
        "Lock down your profile privacy to 'Friends Only' and restrict tagged photo visibility.",
        "File an official complaint with your national Cyber Crime unit (Dial 1930 in India or ic3.gov in USA)."
      ],
      dos: ["Preserve digital evidence without altering timestamps", "Talk to a trusted counselor or family member", "Enable Multi-Factor Authentication"],
      donts: ["Do not delete chat logs before saving proof", "Do not engage in arguments with scammers", "Never transfer funds"]
    },
    {
      id: "apartment-fire-smoke",
      title: "Building Fire Alarm / Smoke Detected",
      icon: "flame",
      category: "Disaster Safety",
      threatLevel: "High Threat",
      threatColor: "#ef4444",
      immediateSteps: [
        "Feel the door handle with the back of your hand. If it is hot, do NOT open it.",
        "If door is cool, open slowly and check if hallway is clear of heavy black smoke.",
        "Stay low and crawl under smoke (clean air is near the floor).",
        "Take the fire exit stairs. NEVER use elevators during a fire evacuation.",
        "If trapped inside room: seal door gaps with wet bedding, wave a bright towel at the window, and call emergency dispatch."
      ],
      dos: ["Close doors behind you to slow flame spread", "Cover nose/mouth with damp cloth", "Alert neighbors by shouting"],
      donts: ["Never return inside for belongings", "Never use elevators", "Don't jump from high floors"]
    }
  ],

  // Checklists (Personal & Emergency Go-Bag)
  checklists: {
    personalSafety: [
      { id: "ps-1", task: "Emergency contacts added to lock screen ICE widget", category: "Daily" },
      { id: "ps-2", task: "Phone battery maintained above 30% before heading out", category: "Daily" },
      { id: "ps-3", task: "Live location shared with a trusted contact during late travel", category: "Travel" },
      { id: "ps-4", task: "Keys held ready in hand before reaching front door or car", category: "Habit" },
      { id: "ps-5", task: "Checked backseat of car before getting inside", category: "Habit" },
      { id: "ps-6", task: "Offered drinks covered or in personal sight at social gatherings", category: "Social" }
    ],
    emergencyPrep: [
      { id: "ep-1", task: "3-day supply of drinking water (4L per person/day)", category: "Kit" },
      { id: "ep-2", task: "Non-perishable food bars and canned rations", category: "Kit" },
      { id: "ep-3", task: "First-aid kit with tourniquet, antiseptic, and bandages", category: "Medical" },
      { id: "ep-4", task: "Prescription medications (minimum 7-day reserve)", category: "Medical" },
      { id: "ep-5", task: "High-capacity power bank & charging cables", category: "Power" },
      { id: "ep-6", task: "Tactical flashlight + extra AA/AAA batteries", category: "Power" },
      { id: "ep-7", task: "Emergency whistle (120dB) for rescue signaling", category: "Survival" },
      { id: "ep-8", task: "Waterproof pouch with ID copies, insurance & cash", category: "Docs" }
    ]
  },

  // Multi-Country Emergency Directory
  emergencyDirectory: {
    India: [
      { service: "National Emergency Helpline (All-in-One)", number: "112", icon: "phone-call", color: "#dc2626", badge: "Universal" },
      { service: "Police Control Room", number: "100", icon: "shield", color: "#2563eb", badge: "Police" },
      { service: "Ambulance / Medical Emergency", number: "108 / 102", icon: "heart-pulse", color: "#059669", badge: "Medical" },
      { service: "Fire & Rescue Services", number: "101", icon: "flame", color: "#ea580c", badge: "Fire" },
      { service: "Women Helpline (National)", number: "1091", icon: "user-check", color: "#9333ea", badge: "Women" },
      { service: "National Cyber Crime Helpline", number: "1930", icon: "lock", color: "#4f46e5", badge: "Cyber" },
      { service: "Childline Emergency Support", number: "1098", icon: "smile", color: "#0891b2", badge: "Child" },
      { service: "Disaster Management Services (NDRF)", number: "1078", icon: "alert-octagon", color: "#d97706", badge: "Disaster" }
    ],
    USA: [
      { service: "Universal Emergency Dispatch (Police/Fire/EMS)", number: "911", icon: "phone-call", color: "#dc2626", badge: "Universal" },
      { service: "National Suicide & Crisis Lifeline", number: "988", icon: "heart-pulse", color: "#059669", badge: "Mental Health" },
      { service: "National Domestic Violence Hotline", number: "1-800-799-7233", icon: "user-check", color: "#9333ea", badge: "Helpline" },
      { service: "Internet Crime Complaint Center (IC3 / FBI)", number: "1-800-CALL-FBI", icon: "lock", color: "#4f46e5", badge: "Cyber" },
      { service: "Poison Control Center", number: "1-800-222-1222", icon: "alert-triangle", color: "#d97706", badge: "Medical" }
    ],
    UK: [
      { service: "Emergency Services (Police, Fire, Ambulance, Coastguard)", number: "999", icon: "phone-call", color: "#dc2626", badge: "Universal" },
      { service: "Non-Emergency Police Support", number: "101", icon: "shield", color: "#2563eb", badge: "Police" },
      { service: "NHS Non-Emergency Health Advice", number: "111", icon: "heart-pulse", color: "#059669", badge: "Medical" },
      { service: "Action Fraud & Cybercrime UK", number: "0300 123 2040", icon: "lock", color: "#4f46e5", badge: "Cyber" }
    ],
    International: [
      { service: "European Union Standard Emergency", number: "112", icon: "phone-call", color: "#dc2626", badge: "EU Wide" },
      { service: "Australia Emergency Dispatch", number: "000", icon: "phone-call", color: "#dc2626", badge: "AU Wide" },
      { service: "Canada Emergency Dispatch", number: "911", icon: "phone-call", color: "#dc2626", badge: "CA Wide" },
      { service: "Japan Police (110) & Ambulance/Fire (119)", number: "110 / 119", icon: "phone-call", color: "#2563eb", badge: "JP Wide" }
    ]
  },

  // Frequently Asked Questions
  faqs: [
    {
      q: "What is SafeSphere and why was it created?",
      a: "SafeSphere is an educational human safety awareness platform designed to democratize critical personal, road, cyber, and disaster safety knowledge. It equips individuals with actionable skills, interactive checklists, and simulation tools to prevent accidents and survive emergencies."
    },
    {
      q: "How does the Safety Risk Analyzer ML feature work?",
      a: "The Safety Risk Analyzer uses a lightweight Natural Language Processing (NLP) tokenization and weighted heuristic classifier running entirely client-side in JavaScript. It parses environmental indicators, situational keywords, and vulnerability factors to calculate an educational risk score and output safety protocols."
    },
    {
      q: "Is SafeSphere a replacement for 911 or 112 emergency services?",
      a: "No. SafeSphere is strictly an educational and awareness resource. During an active real-world emergency, you must immediately dial your official local emergency services (such as 112, 911, or 999) and seek immediate physical assistance."
    },
    {
      q: "Are my passwords or quiz entries sent to any external server?",
      a: "Never. SafeSphere is built with privacy-first client-side architecture. All password entropy calculations, quiz scores, bookmarked blogs, and custom comments are processed and stored locally on your device via HTML5 LocalStorage."
    },
    {
      q: "Can I use the Go-Bag and Personal Safety checklists offline?",
      a: "Yes! The checklist states are synchronized to your browser's LocalStorage and will remain saved even when you close or reload the browser."
    }
  ]
};

// Expose globally for browser modules
if (typeof window !== "undefined") {
  window.SafeSphereData = SafeSphereData;
}
