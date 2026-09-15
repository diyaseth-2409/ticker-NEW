export const initialState = {
  template: 'classic',
  items: [
    "Breaking news: India's GDP growth hits 7.4% in Q2, beats forecast",
    'Stock markets close higher — Sensex surges 620 pts, Nifty at record high',
    'India vs Australia: Live scorecard — IND 278/4 after 45 overs',
    'Cabinet approves new renewable energy policy targeting 500 GW by 2030',
    'Delhi weather: Heavy rains expected this week, IMD issues orange alert',
  ],
  badge: { show: true, type: 'LIVE', customText: 'LIVE', bgColor: '#D7282F', textColor: '#FFFFFF', fontWeight: '700', scale: 1 },
  style: { bgColor: '#FFFFFF', textColor: '#1A1714', accentColor: '#D7282F', separatorColor: '#D7282F', height: '48px', cornerRadius: '0px', bgGradient: null, ddStyle: 'chevron' },
  text: { fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '500', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left', letterSpacing: '0em', textTransform: 'none' },
  behavior: { speed: 2, mode: 'loop', animation: 'fade', itemDuration: 5 },
  activeTab: 'content',
  device: 'desktop',
  src: 'manual',
  rssUrl: '',
  jsonUrl: '',
  // Per-source drafts — each Content Source tab edits its own, independent of the
  // others, so switching tabs never silently wipes what was typed elsewhere.
  drafts: {
    manual: [
      "Breaking news: India's GDP growth hits 7.4% in Q2, beats forecast",
      'Stock markets close higher — Sensex surges 620 pts, Nifty at record high',
      'India vs Australia: Live scorecard — IND 278/4 after 45 overs',
      'Cabinet approves new renewable energy policy targeting 500 GW by 2030',
      'Delhi weather: Heavy rains expected this week, IMD issues orange alert',
    ],
    rss: [],
    json: [],
  },
};
