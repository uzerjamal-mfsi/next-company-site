export const CONSTANTS = {
  fallback: {
    companyName: 'The Company',
    mission: 'To help companies ship software faster',
    vision: 'Every idea can become a reality',
    footerText: 'All rights reserved.',
  },
  sections: {
    about: {
      title: 'About',
      subtitle: 'Learn more about us.',
      missionTitle: 'Our Mission',
      visionTitle: 'Our Vision',
      teamTitle: 'Our Team',
      teamSubtitle: 'The people behind our products and services.',
    },
    services: {
      title: 'Our Services',
      subtitle: 'From idea to production, we turn ideas into digital products.',
    },
    blog: {
      listTitle: 'Blog',
      subtitle: 'Blogs from our Team.',
      featuredTitle: 'Featured Articles',
      featuredSubtitle: 'Insights, updates, and tutorials from our team.',
      viewAll: 'View all posts',
      continueReading: 'Continue reading',
      readMore: 'Read more',
      noPosts: 'No posts found.',
      searchLabel: 'Search posts',
      searchPlaceholder: 'Search posts...',
    },
    team: {
      title: 'Our Team',
      subtitle: 'The people behind our products and services.',
      viewProfile: 'View profile',
    },
    hero: {
      ctaServices: 'Our Services',
      ctaContact: 'Contact Us',
    },
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      team: 'Team',
      blog: 'Blog',
      contact: 'Contact',
      getStarted: 'Get Started',
    },
    footer: {
      rights: 'All rights reserved.',
    },
    blogPost: {
      by: 'By',
    },
  },
} as const;

export type Constants = typeof CONSTANTS;
