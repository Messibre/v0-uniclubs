// Mock data for UniClubs demo - Ethiopian themed

// ===================== DEMO USERS =====================
export interface DemoUser {
  id: string
  email: string
  firstName: string
  lastName: string
  studentId: string | null
  avatar: string
  role: 'student' | 'officer' | 'admin'
  major: string | null
  department: string | null
  interests: string[]
  badges: string[]
  joinedClubs: string[] // club IDs
  managedClubs: string[] // club IDs where user is officer
  pendingRequests: string[] // club IDs with pending membership
  createdAt: string
  bio?: string
}

export const DEMO_USERS: Record<string, DemoUser> = {
  student: {
    id: "user-student-1",
    email: "abebe.kebede@aau.edu.et",
    firstName: "Abebe",
    lastName: "Kebede",
    studentId: "UGR/00123/12",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=abebe&backgroundColor=b6e3f4",
    role: "student",
    major: "Computer Science",
    department: "School of Information Technology",
    interests: ["Technology", "Music", "Sports"],
    badges: ["Early Adopter", "Active Member"],
    joinedClubs: ["club-1", "club-2"],
    managedClubs: [],
    pendingRequests: ["club-4"],
    createdAt: "2023-09-10T00:00:00Z",
    bio: "Third year CS student passionate about building apps and contributing to open source.",
  },
  officer: {
    id: "user-officer-1",
    email: "senait.negash@aau.edu.et",
    firstName: "Senait",
    lastName: "Negash",
    studentId: "UGR/00456/11",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=senait&backgroundColor=c0aede",
    role: "officer",
    major: "Business Administration",
    department: "College of Business & Economics",
    interests: ["Leadership", "Culture", "Technology"],
    badges: ["Club President", "Event Organizer", "Community Builder"],
    joinedClubs: ["club-1", "club-3"],
    managedClubs: ["club-3"],
    pendingRequests: [],
    createdAt: "2022-09-15T00:00:00Z",
    bio: "Cultural enthusiast and student leader dedicated to preserving Ethiopian heritage.",
  },
  admin: {
    id: "user-admin-1",
    email: "admin@aau.edu.et",
    firstName: "Yonas",
    lastName: "Tadesse",
    studentId: null,
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=admin&backgroundColor=ffd5dc",
    role: "admin",
    major: null,
    department: "Student Affairs Office",
    interests: [],
    badges: ["Platform Admin", "University Staff"],
    joinedClubs: [],
    managedClubs: [],
    pendingRequests: [],
    createdAt: "2021-01-01T00:00:00Z",
    bio: "Director of Student Affairs at Addis Ababa University.",
  },
}

// ===================== MEMBERS =====================
export interface Member {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  studentId: string
  major: string
  role: 'member' | 'president' | 'vice_president' | 'secretary' | 'treasurer' | 'event_coordinator' | 'pr_officer'
  joinDate: string
  attendance: number // percentage
  clubId: string
}

export const MOCK_MEMBERS: Member[] = [
  // AAU Tech Club members
  {
    id: "member-1",
    firstName: "Kidus",
    lastName: "Alemayehu",
    email: "kidus.alemayehu@aau.edu.et",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=kidus&backgroundColor=b6e3f4",
    studentId: "UGR/00234/11",
    major: "Software Engineering",
    role: "president",
    joinDate: "2023-01-15",
    attendance: 95,
    clubId: "club-1",
  },
  {
    id: "member-2",
    firstName: "Sara",
    lastName: "Bekele",
    email: "sara.bekele@aau.edu.et",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=sara&backgroundColor=ffd5dc",
    studentId: "UGR/00345/12",
    major: "Computer Science",
    role: "vice_president",
    joinDate: "2023-03-20",
    attendance: 88,
    clubId: "club-1",
  },
  {
    id: "member-3",
    firstName: "Abel",
    lastName: "Tesfaye",
    email: "abel.tesfaye@aau.edu.et",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=abel&backgroundColor=c0aede",
    studentId: "UGR/00567/13",
    major: "Information Systems",
    role: "treasurer",
    joinDate: "2023-06-10",
    attendance: 92,
    clubId: "club-1",
  },
  {
    id: "member-4",
    firstName: "Tigist",
    lastName: "Hailu",
    email: "tigist.hailu@aau.edu.et",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=tigist&backgroundColor=d1fae5",
    studentId: "UGR/00789/12",
    major: "Computer Engineering",
    role: "member",
    joinDate: "2024-01-05",
    attendance: 75,
    clubId: "club-1",
  },
  {
    id: "member-5",
    firstName: "Yosef",
    lastName: "Worku",
    email: "yosef.worku@aau.edu.et",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=yosef&backgroundColor=fed7aa",
    studentId: "UGR/00890/13",
    major: "Software Engineering",
    role: "member",
    joinDate: "2024-02-12",
    attendance: 82,
    clubId: "club-1",
  },
  // Ethiopian Cultural Club members
  {
    id: "member-6",
    firstName: "Senait",
    lastName: "Negash",
    email: "senait.negash@aau.edu.et",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=senait&backgroundColor=c0aede",
    studentId: "UGR/00456/11",
    major: "Business Administration",
    role: "president",
    joinDate: "2022-09-15",
    attendance: 98,
    clubId: "club-3",
  },
  {
    id: "member-7",
    firstName: "Meron",
    lastName: "Tesfaye",
    email: "meron.tesfaye@aau.edu.et",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=meron&backgroundColor=fce7f3",
    studentId: "UGR/00567/12",
    major: "Social Work",
    role: "event_coordinator",
    joinDate: "2023-01-20",
    attendance: 91,
    clubId: "club-3",
  },
  {
    id: "member-8",
    firstName: "Bereket",
    lastName: "Desta",
    email: "bereket.desta@aau.edu.et",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=bereket&backgroundColor=dbeafe",
    studentId: "UGR/00678/13",
    major: "Music",
    role: "member",
    joinDate: "2023-09-05",
    attendance: 85,
    clubId: "club-3",
  },
  {
    id: "member-9",
    firstName: "Hiwot",
    lastName: "Girma",
    email: "hiwot.girma@aau.edu.et",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=hiwot&backgroundColor=fef3c7",
    studentId: "UGR/00789/12",
    major: "Fine Arts",
    role: "pr_officer",
    joinDate: "2023-06-15",
    attendance: 88,
    clubId: "club-3",
  },
  {
    id: "member-10",
    firstName: "Daniel",
    lastName: "Assefa",
    email: "daniel.assefa@aau.edu.et",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=daniel&backgroundColor=e0e7ff",
    studentId: "UGR/00901/13",
    major: "Theatre Arts",
    role: "member",
    joinDate: "2024-01-10",
    attendance: 78,
    clubId: "club-3",
  },
]

// ===================== CLUBS =====================
export interface Club {
  id: string
  name: string
  shortName: string
  category: string
  description: string
  logo: string
  coverPhoto: string
  memberCount: number
  status: 'active' | 'pending' | 'suspended'
  membershipPolicy: 'open' | 'approval_required' | 'invite_only'
  recruitingStatus: boolean
  createdAt: string
  tags: string[]
  missionStatement: string
  socialLinks: { website?: string; instagram?: string; telegram?: string }
  officers: { userId: string; role: string; name: string }[]
}

export const MOCK_CLUBS: Club[] = [
  {
    id: "club-1",
    name: "AAU Tech Club",
    shortName: "ATC",
    category: "STEM",
    description: "A hub for tech enthusiasts at Addis Ababa University to explore cutting-edge technologies, build projects, collaborate on hackathons, and network with industry professionals.",
    logo: "https://api.dicebear.com/9.x/shapes/svg?seed=tech&backgroundColor=3b82f6",
    coverPhoto: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    memberCount: 245,
    status: "active",
    membershipPolicy: "open",
    recruitingStatus: true,
    createdAt: "2024-01-15",
    tags: ["Technology", "Programming", "Innovation", "Hackathons"],
    missionStatement: "Empowering students to innovate and build the future through technology.",
    socialLinks: { telegram: "@aautechclub", instagram: "@aau_tech" },
    officers: [
      { userId: "member-1", role: "President", name: "Kidus Alemayehu" },
      { userId: "member-2", role: "Vice President", name: "Sara Bekele" },
    ],
  },
  {
    id: "club-2",
    name: "Engineering Society",
    shortName: "ES",
    category: "STEM",
    description: "Bringing together engineering students from all disciplines to collaborate on projects, participate in competitions, and connect with industry leaders.",
    logo: "https://api.dicebear.com/9.x/shapes/svg?seed=engineering&backgroundColor=f59e0b",
    coverPhoto: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    memberCount: 312,
    status: "active",
    membershipPolicy: "open",
    recruitingStatus: true,
    createdAt: "2023-09-20",
    tags: ["Engineering", "Projects", "Competitions"],
    missionStatement: "Building tomorrow's engineers through collaboration and innovation.",
    socialLinks: { telegram: "@aauengineering" },
    officers: [
      { userId: "user-4", role: "President", name: "Ermias Hailu" },
    ],
  },
  {
    id: "club-3",
    name: "Ethiopian Cultural Club",
    shortName: "ECC",
    category: "Cultural",
    description: "Celebrating Ethiopian heritage through traditional music, dance, cuisine, and cultural exchange programs that bring the entire campus community together.",
    logo: "https://api.dicebear.com/9.x/shapes/svg?seed=cultural&backgroundColor=22c55e",
    coverPhoto: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    memberCount: 189,
    status: "active",
    membershipPolicy: "open",
    recruitingStatus: true,
    createdAt: "2023-06-01",
    tags: ["Culture", "Music", "Dance", "Heritage"],
    missionStatement: "Preserving and celebrating Ethiopian cultural heritage while fostering unity.",
    socialLinks: { instagram: "@ecc_aau", telegram: "@eccaau" },
    officers: [
      { userId: "user-officer-1", role: "President", name: "Senait Negash" },
      { userId: "member-7", role: "Events Coordinator", name: "Meron Tesfaye" },
    ],
  },
  {
    id: "club-4",
    name: "Debate & Public Speaking",
    shortName: "DPS",
    category: "Professional",
    description: "Master the art of persuasion and public speaking through regular debates, workshops, and competitions that prepare you for leadership roles.",
    logo: "https://api.dicebear.com/9.x/shapes/svg?seed=debate&backgroundColor=8b5cf6",
    coverPhoto: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    memberCount: 156,
    status: "active",
    membershipPolicy: "approval_required",
    recruitingStatus: true,
    createdAt: "2023-11-10",
    tags: ["Debate", "Leadership", "Communication", "Public Speaking"],
    missionStatement: "Developing confident communicators and critical thinkers.",
    socialLinks: { telegram: "@dpclub_aau" },
    officers: [
      { userId: "user-6", role: "President", name: "Dawit Mengistu" },
    ],
  },
  {
    id: "club-5",
    name: "Community Service League",
    shortName: "CSL",
    category: "Service",
    description: "Making a difference in our community through volunteer programs, charity drives, and outreach initiatives that impact lives across Addis Ababa.",
    logo: "https://api.dicebear.com/9.x/shapes/svg?seed=service&backgroundColor=ec4899",
    coverPhoto: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    memberCount: 203,
    status: "active",
    membershipPolicy: "open",
    recruitingStatus: true,
    createdAt: "2023-08-15",
    tags: ["Volunteering", "Community", "Charity", "Outreach"],
    missionStatement: "Serving our community and creating lasting positive change.",
    socialLinks: { instagram: "@csl_aau" },
    officers: [
      { userId: "user-7", role: "President", name: "Hana Girma" },
    ],
  },
]

// ===================== EVENTS =====================
export interface Event {
  id: string
  title: string
  description: string
  date: string
  endDate?: string
  location: string
  locationType: 'in_person' | 'virtual' | 'hybrid'
  capacity: number
  attendeeCount: number
  rsvpCount: number
  waitlistCount: number
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  visibility: 'public' | 'members_only'
  clubId: string
  club: Club
  coverImage?: string
}

export const MOCK_EVENTS: Event[] = [
  {
    id: "event-1",
    title: "Hackathon 2026: Build for Ethiopia",
    description: "A 48-hour hackathon focused on building solutions for local challenges. Form teams, build prototypes, and compete for prizes worth 50,000 ETB!",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
    location: "AAU Main Campus - Technology Building",
    locationType: "in_person",
    capacity: 150,
    attendeeCount: 98,
    rsvpCount: 112,
    waitlistCount: 8,
    status: "upcoming",
    visibility: "public",
    clubId: "club-1",
    club: MOCK_CLUBS[0],
    coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },
  {
    id: "event-2",
    title: "Ethiopian New Year Cultural Night",
    description: "Join us for an evening of traditional performances, authentic cuisine, and celebrations as we welcome the Ethiopian New Year together.",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    location: "University Auditorium",
    locationType: "in_person",
    capacity: 500,
    attendeeCount: 342,
    rsvpCount: 420,
    waitlistCount: 35,
    status: "upcoming",
    visibility: "public",
    clubId: "club-3",
    club: MOCK_CLUBS[2],
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  },
  {
    id: "event-3",
    title: "Engineering Project Showcase",
    description: "Final year students present their capstone projects. Network with industry professionals and explore innovative solutions.",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Engineering Building - Exhibition Hall",
    locationType: "hybrid",
    capacity: 200,
    attendeeCount: 156,
    rsvpCount: 178,
    waitlistCount: 0,
    status: "upcoming",
    visibility: "public",
    clubId: "club-2",
    club: MOCK_CLUBS[1],
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
  {
    id: "event-4",
    title: "Inter-University Debate Championship",
    description: "Watch the best debaters from universities across Ethiopia compete. This year's topic: 'The Role of Technology in African Development'.",
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Conference Center",
    locationType: "in_person",
    capacity: 300,
    attendeeCount: 245,
    rsvpCount: 280,
    waitlistCount: 12,
    status: "upcoming",
    visibility: "public",
    clubId: "club-4",
    club: MOCK_CLUBS[3],
    coverImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
  },
  {
    id: "event-5",
    title: "Community Cleanup Drive",
    description: "Join us for a morning of giving back! We'll be cleaning up areas around campus and planting trees. Refreshments provided.",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Meet at Main Gate",
    locationType: "in_person",
    capacity: 100,
    attendeeCount: 67,
    rsvpCount: 82,
    waitlistCount: 0,
    status: "upcoming",
    visibility: "public",
    clubId: "club-5",
    club: MOCK_CLUBS[4],
    coverImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
  },
  {
    id: "event-6",
    title: "Tech Talk: AI in Healthcare",
    description: "Guest speaker Dr. Tigist Hailu discusses applications of artificial intelligence in Ethiopian healthcare systems.",
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Virtual - Google Meet",
    locationType: "virtual",
    capacity: 500,
    attendeeCount: 234,
    rsvpCount: 312,
    waitlistCount: 0,
    status: "upcoming",
    visibility: "public",
    clubId: "club-1",
    club: MOCK_CLUBS[0],
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80",
  },
]

// ===================== MEMBERSHIP REQUESTS =====================
export interface MembershipRequest {
  id: string
  userId: string
  userName: string
  userEmail: string
  userAvatar: string
  clubId: string
  clubName: string
  status: 'pending' | 'approved' | 'rejected'
  message: string
  submittedAt: string
}

export const MOCK_MEMBERSHIP_REQUESTS: MembershipRequest[] = [
  {
    id: "req-1",
    userId: "user-student-1",
    userName: "Abebe Kebede",
    userEmail: "abebe.kebede@aau.edu.et",
    userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=abebe",
    clubId: "club-4",
    clubName: "Debate & Public Speaking",
    status: "pending",
    message: "I am passionate about public speaking and want to improve my debate skills.",
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "req-2",
    userId: "user-8",
    userName: "Bethlehem Assefa",
    userEmail: "bethlehem.assefa@aau.edu.et",
    userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=bethlehem",
    clubId: "club-3",
    clubName: "Ethiopian Cultural Club",
    status: "pending",
    message: "I love traditional Ethiopian music and would love to participate in cultural events.",
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "req-3",
    userId: "user-9",
    userName: "Nahom Tadesse",
    userEmail: "nahom.tadesse@aau.edu.et",
    userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=nahom",
    clubId: "club-3",
    clubName: "Ethiopian Cultural Club",
    status: "pending",
    message: "Interested in organizing cultural exchange events.",
    submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "req-4",
    userId: "user-10",
    userName: "Selam Haile",
    userEmail: "selam.haile@aau.edu.et",
    userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=selam",
    clubId: "club-3",
    clubName: "Ethiopian Cultural Club",
    status: "pending",
    message: "I am a traditional dancer and would love to perform at club events.",
    submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
]

// ===================== POSTS =====================
export interface Post {
  id: string
  clubId: string
  clubName: string
  clubLogo: string
  authorId: string
  authorName: string
  authorAvatar: string
  content: string
  type: 'general' | 'event_promotion' | 'poll' | 'project_highlight' | 'announcement'
  images?: string[]
  likes: number
  comments: number
  shares: number
  createdAt: string
}

export const MOCK_POSTS: Post[] = [
  {
    id: "post-1",
    clubId: "club-1",
    clubName: "AAU Tech Club",
    clubLogo: MOCK_CLUBS[0].logo,
    authorId: "member-1",
    authorName: "Kidus Alemayehu",
    authorAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=kidus",
    content: "Exciting news! Registration for Hackathon 2026 is now open. Build solutions for Ethiopian challenges and win prizes worth 50,000 ETB! Register now through the link in our bio. #HackForEthiopia #TechInnovation",
    type: "event_promotion",
    images: ["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80"],
    likes: 156,
    comments: 23,
    shares: 45,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "post-2",
    clubId: "club-3",
    clubName: "Ethiopian Cultural Club",
    clubLogo: MOCK_CLUBS[2].logo,
    authorId: "user-officer-1",
    authorName: "Senait Negash",
    authorAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=senait",
    content: "Thank you to everyone who attended our coffee ceremony workshop last weekend! It was amazing to see so many students interested in learning about our beautiful tradition. Stay tuned for more cultural events coming soon!",
    type: "general",
    images: ["https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80"],
    likes: 89,
    comments: 12,
    shares: 18,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "post-3",
    clubId: "club-2",
    clubName: "Engineering Society",
    clubLogo: MOCK_CLUBS[1].logo,
    authorId: "user-4",
    authorName: "Ermias Hailu",
    authorAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=ermias",
    content: "Our solar-powered water purification project just won second place at the National Engineering Competition! Congratulations to the entire team. This is what happens when brilliant minds come together. #ProudMoment",
    type: "project_highlight",
    images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80", "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80"],
    likes: 234,
    comments: 45,
    shares: 67,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "post-4",
    clubId: "club-1",
    clubName: "AAU Tech Club",
    clubLogo: MOCK_CLUBS[0].logo,
    authorId: "member-2",
    authorName: "Sara Bekele",
    authorAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=sara",
    content: "Just wrapped up our beginner Python workshop! 45 students learned the basics of programming today. Special thanks to our volunteer mentors who made this possible. Next up: Web Development fundamentals!",
    type: "general",
    images: ["https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&q=80"],
    likes: 78,
    comments: 15,
    shares: 12,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "post-5",
    clubId: "club-5",
    clubName: "Community Service League",
    clubLogo: MOCK_CLUBS[4].logo,
    authorId: "user-7",
    authorName: "Hana Girma",
    authorAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=hana",
    content: "This Saturday we're organizing a community cleanup drive around campus. Volunteers needed! Free refreshments and certificates will be provided. Let's make our campus beautiful together!",
    type: "announcement",
    images: ["https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80"],
    likes: 56,
    comments: 8,
    shares: 23,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
]

// ===================== NOTIFICATIONS =====================
export interface Notification {
  id: string
  userId: string
  type: 'event_reminder' | 'membership_approved' | 'membership_request' | 'new_post' | 'event_update' | 'club_announcement' | 'system'
  title: string
  message: string
  read: boolean
  link?: string
  createdAt: string
  icon?: string
}

export const MOCK_NOTIFICATIONS: Record<string, Notification[]> = {
  student: [
    {
      id: "notif-1",
      userId: "user-student-1",
      type: "event_reminder",
      title: "Event Tomorrow",
      message: "Community Cleanup Drive starts tomorrow at 8 AM. Don't forget to bring comfortable clothes!",
      read: false,
      link: "/events/event-5",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "notif-2",
      userId: "user-student-1",
      type: "new_post",
      title: "New Post from AAU Tech Club",
      message: "Hackathon 2026 registration is now open!",
      read: false,
      link: "/clubs/club-1",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "notif-3",
      userId: "user-student-1",
      type: "club_announcement",
      title: "Engineering Society Update",
      message: "Meeting schedule changed for this week.",
      read: true,
      link: "/clubs/club-2",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "notif-4",
      userId: "user-student-1",
      type: "event_update",
      title: "RSVP Confirmed",
      message: "Your RSVP for Hackathon 2026 has been confirmed. See you there!",
      read: true,
      link: "/events/event-1",
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "notif-5",
      userId: "user-student-1",
      type: "system",
      title: "Profile Incomplete",
      message: "Complete your profile to get personalized club recommendations.",
      read: false,
      link: "/profile",
      createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    },
  ],
  officer: [
    {
      id: "notif-6",
      userId: "user-officer-1",
      type: "membership_request",
      title: "New Membership Request",
      message: "Bethlehem Assefa has requested to join Ethiopian Cultural Club.",
      read: false,
      link: "/officer/manage",
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "notif-7",
      userId: "user-officer-1",
      type: "event_update",
      title: "Event RSVP Milestone",
      message: "Ethiopian New Year Cultural Night has reached 80% capacity!",
      read: false,
      link: "/events/event-2",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "notif-8",
      userId: "user-officer-1",
      type: "membership_request",
      title: "New Membership Request",
      message: "Nahom Tadesse has requested to join Ethiopian Cultural Club.",
      read: false,
      link: "/officer/manage",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "notif-9",
      userId: "user-officer-1",
      type: "club_announcement",
      title: "Weekly Report Ready",
      message: "Your club's weekly engagement report is ready to view.",
      read: true,
      link: "/officer/analytics",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  admin: [
    {
      id: "notif-10",
      userId: "user-admin-1",
      type: "club_announcement",
      title: "New Club Registration",
      message: "Photography Guild has submitted a registration request.",
      read: false,
      link: "/admin/clubs",
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: "notif-11",
      userId: "user-admin-1",
      type: "event_update",
      title: "Event Pending Approval",
      message: "Career Fair 2026 event requires your approval.",
      read: false,
      link: "/admin/events",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "notif-12",
      userId: "user-admin-1",
      type: "system",
      title: "Platform Analytics",
      message: "Weekly platform report is ready. User engagement up 15%!",
      read: false,
      link: "/admin/analytics",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "notif-13",
      userId: "user-admin-1",
      type: "club_announcement",
      title: "New Club Registration",
      message: "Chess Club has submitted a registration request.",
      read: true,
      link: "/admin/clubs",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
}

// ===================== ANALYTICS DATA =====================
export const MOCK_ANALYTICS = {
  // Platform-wide analytics (admin)
  platform: {
    weeklyActiveUsers: [
      { name: 'Mon', active: 1245 },
      { name: 'Tue', active: 1890 },
      { name: 'Wed', active: 2340 },
      { name: 'Thu', active: 2100 },
      { name: 'Fri', active: 1650 },
      { name: 'Sat', active: 890 },
      { name: 'Sun', active: 720 },
    ],
    clubDistribution: [
      { name: 'STEM', value: 45, color: '#3b82f6' },
      { name: 'Arts', value: 30, color: '#8b5cf6' },
      { name: 'Sports', value: 25, color: '#22c55e' },
      { name: 'Cultural', value: 20, color: '#f59e0b' },
      { name: 'Professional', value: 15, color: '#ef4444' },
      { name: 'Service', value: 10, color: '#ec4899' },
    ],
    monthlyGrowth: [
      { month: 'Jan', users: 1200, clubs: 42, events: 28 },
      { month: 'Feb', users: 1450, clubs: 45, events: 35 },
      { month: 'Mar', users: 1890, clubs: 48, events: 42 },
      { month: 'Apr', users: 2200, clubs: 52, events: 48 },
      { month: 'May', users: 2847, clubs: 58, events: 56 },
    ],
    topClubs: [
      { name: 'Engineering Society', members: 312, engagement: 94 },
      { name: 'AAU Tech Club', members: 245, engagement: 91 },
      { name: 'Community Service League', members: 203, engagement: 88 },
      { name: 'Ethiopian Cultural Club', members: 189, engagement: 85 },
      { name: 'Debate & Public Speaking', members: 156, engagement: 82 },
    ],
  },
  // Club-specific analytics (officer)
  club: {
    eventAttendance: [
      { name: 'Coffee Ceremony', attendees: 45 },
      { name: 'Dance Workshop', attendees: 78 },
      { name: 'Cultural Night', attendees: 156 },
      { name: 'Music Session', attendees: 34 },
    ],
    memberGrowth: [
      { month: 'Jan', members: 120 },
      { month: 'Feb', members: 135 },
      { month: 'Mar', members: 156 },
      { month: 'Apr', members: 172 },
      { month: 'May', members: 189 },
    ],
    postEngagement: [
      { week: 'Week 1', views: 450, likes: 89, comments: 23 },
      { week: 'Week 2', views: 520, likes: 112, comments: 34 },
      { week: 'Week 3', views: 380, likes: 67, comments: 18 },
      { week: 'Week 4', views: 680, likes: 145, comments: 56 },
    ],
    memberActivity: [
      { name: 'Very Active', value: 35 },
      { name: 'Active', value: 45 },
      { name: 'Moderate', value: 15 },
      { name: 'Inactive', value: 5 },
    ],
  },
}

// ===================== ADMIN DATA =====================
export const MOCK_ADMIN_STATS = {
  totalUsers: 2847,
  totalClubs: MOCK_CLUBS.length,
  totalEvents: MOCK_EVENTS.length,
  activeEventsThisMonth: 4,
  pendingClubRegistrations: 2,
  pendingEventApprovals: 3,
  weeklyActiveUsers: 1234,
  monthlyGrowth: {
    users: 12,
    clubs: 8,
    events: 15,
  },
}

export const MOCK_PENDING_APPROVALS = [
  {
    id: "approval-1",
    type: "club" as const,
    name: "Photography Guild",
    submittedBy: "Meklit Haile",
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: "A club for photography enthusiasts to share their work and learn together.",
  },
  {
    id: "approval-2",
    type: "event" as const,
    name: "Career Fair 2026",
    submittedBy: "Engineering Society",
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Annual career fair connecting students with potential employers.",
  },
  {
    id: "approval-3",
    type: "club" as const,
    name: "Chess Club",
    submittedBy: "Dawit Kebede",
    submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    description: "For chess enthusiasts to practice and compete.",
  },
  {
    id: "approval-4",
    type: "event" as const,
    name: "Spring Music Festival",
    submittedBy: "Ethiopian Cultural Club",
    submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    description: "Annual music festival celebrating Ethiopian artists.",
  },
]

// ===================== AI RECOMMENDATIONS =====================
export const MOCK_AI_RECOMMENDATIONS = {
  student: {
    clubs: [
      {
        clubId: "club-4",
        clubName: "Debate & Public Speaking",
        reason: "Based on your interest in leadership and your activity in STEM clubs, this club would help develop your communication skills.",
        matchScore: 92,
      },
      {
        clubId: "club-5",
        clubName: "Community Service League",
        reason: "Students with similar profiles often enjoy volunteering. Great for networking and making an impact.",
        matchScore: 85,
      },
    ],
    events: [
      {
        eventId: "event-1",
        eventTitle: "Hackathon 2026",
        reason: "Perfectly aligned with your CS major and tech interests. You have registered for similar events before.",
        matchScore: 98,
      },
      {
        eventId: "event-3",
        eventTitle: "Engineering Project Showcase",
        reason: "Great networking opportunity with industry professionals in your field.",
        matchScore: 88,
      },
    ],
  },
  officer: {
    insights: [
      "Engagement peaks on Tuesdays and Thursdays - consider scheduling major announcements during these windows.",
      "Your recent Hackathon post achieved 3x average engagement. Photo-based posts perform 40% better than text-only.",
      "3 pending membership requests need attention. Average response time this month: 18 hours.",
      "Event attendance has increased 24% compared to last month. The cultural workshops are particularly popular.",
    ],
    suggestions: [
      "Consider hosting a virtual event - 35% of your members are more active in online events.",
      "Collaborate with AAU Tech Club - your member overlap suggests high interest in joint events.",
    ],
  },
  admin: {
    platformInsights: [
      "Platform engagement peaks significantly on Wednesdays. STEM clubs have the highest retention rate (85%).",
      "Arts clubs acquire new members 2x faster at the start of semesters.",
      "Recommend promoting under-represented categories (Hobbies, Sports) in the next 'Discover' newsletter.",
      "User satisfaction score: 4.2/5.0 - up from 3.8 last quarter.",
    ],
    actionItems: [
      "2 clubs have been inactive for 30+ days - consider reaching out to leadership.",
      "5 events this month had >90% capacity - consider encouraging larger venues.",
    ],
  },
}

// ===================== ACTIVITY FEED =====================
export interface Activity {
  id: string
  type: 'event_rsvp' | 'club_join' | 'post_like' | 'post_comment' | 'badge_earned' | 'event_created' | 'member_approved'
  description: string
  timestamp: string
  actor: string
  actorAvatar: string
  target?: string
  targetId?: string
}

export const MOCK_ACTIVITIES: Record<string, Activity[]> = {
  student: [
    {
      id: "act-1",
      type: "event_rsvp",
      description: "registered for Hackathon 2026",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      actor: "You",
      actorAvatar: "",
      target: "AAU Tech Club",
      targetId: "event-1",
    },
    {
      id: "act-2",
      type: "post_like",
      description: "liked a post from Engineering Society",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      actor: "You",
      actorAvatar: "",
      target: "Engineering Society",
      targetId: "post-3",
    },
    {
      id: "act-3",
      type: "badge_earned",
      description: "earned the 'Active Member' badge",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      actor: "You",
      actorAvatar: "",
    },
  ],
  officer: [
    {
      id: "act-4",
      type: "member_approved",
      description: "approved membership for Selam Haile",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      actor: "You",
      actorAvatar: "",
      target: "Ethiopian Cultural Club",
    },
    {
      id: "act-5",
      type: "event_created",
      description: "created Ethiopian New Year Cultural Night",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      actor: "You",
      actorAvatar: "",
      target: "Ethiopian Cultural Club",
      targetId: "event-2",
    },
  ],
  admin: [
    {
      id: "act-6",
      type: "club_join",
      description: "approved registration for Chess Club",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      actor: "You",
      actorAvatar: "",
    },
    {
      id: "act-7",
      type: "event_created",
      description: "approved Career Fair 2026 event",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      actor: "You",
      actorAvatar: "",
      target: "Engineering Society",
    },
  ],
}
