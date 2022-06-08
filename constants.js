const companyDetails = {
  companyName: 'Company Name',
  companyDescription: 'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio.',
  email: 'info@companyname.com',
  phone: '+919999451000',
}

const tarotCards = [
  { id: 1, image: "1.png", title: "The Hierophant" },
  { id: 2, image: "2.png", title: "V" },
  { id: 3, image: "3.png", title: "Ace" },
  { id: 4, image: "4.png", title: "VIII" },
  { id: 5, image: "5.png", title: "IX" },
  { id: 6, image: "6.png", title: "Ace" },
  { id: 7, image: "7.png", title: "IX" },
  { id: 8, image: "8.png", title: "The Lovers VI" },
  { id: 9, image: "9.png", title: "The Hermit IX" },
  { id: 10, image: "10.png", title: "VI" },
  { id: 11, image: "11.png", title: "The Wheel Of Fortune X" },
  { id: 12, image: "12.png", title: "Judgement XX" },
  { id: 13, image: "13.png", title: "IV" },
  { id: 14, image: "14.png", title: "VIII" },
  { id: 15, image: "15.png", title: "The Hanged Man XII" },
  { id: 16, image: "16.png", title: "King of Pentacles" },
  { id: 17, image: "17.png", title: "Strength VIII" },
  { id: 18, image: "18.png", title: "The World XXI" },
  { id: 19, image: "19.png", title: "The Devil XV" },
  { id: 20, image: "20.png", title: "VI" },
  { id: 21, image: "21.png", title: "The Magician I" },
  { id: 22, image: "22.png", title: "II" },
  { id: 23, image: "23.png", title: "The Chariot VII" },
  { id: 24, image: "24.png", title: "VII" },
  { id: 25, image: "25.png", title: "The SUn XIX" },
  { id: 26, image: "26.png", title: "Queen of Pentacles" },
  { id: 27, image: "27.png", title: "VII" },
  { id: 28, image: "28.png", title: "X" },
  { id: 29, image: "29.png", title: "X" },
  { id: 30, image: "30.png", title: "Page of Cups" },
  { id: 31, image: "31.png", title: "Page of Swords" },
  { id: 32, image: "32.png", title: "IV" },
  { id: 33, image: "33.png", title: "Knight of Swords" },
  { id: 34, image: "34.png", title: "Qween of Swords" },
  { id: 35, image: "35.png", title: "VII" },
  { id: 36, image: "36.png", title: "II" },
  { id: 37, image: "37.png", title: "The Star XVII" },
  { id: 38, image: "38.png", title: "VI" },
  { id: 39, image: "39.png", title: "Knight of Pentacles" },
  { id: 40, image: "40.png", title: "Knight of Clips" },
];

const validPages = ['zodiacsign', 'numerology', 'tarotcard'];

const validSigns = [
  { Aries: "1-aries.png" },
  { Taurus: "2-taurus.png" },
  { Gemini: "3-gemini.png" },
  { Cancer: "4-cancer.png" },
  { Leo: "5-leo.png" },
  { Virgo: "6-virgo.png" },
  { Libra: "7-libra.png" },
  { Scorpio: "8-scorpio.png" },
  { Sagittarius: "9-sagittarius.png" },
  { Capricorn: "10-capricorn.png" },
  { Aquarius: "11-aquarius.png" },
  { Pisces: "12-pisces.png" },
];

const horoscopeCategories = [
  { Love: "love.png" },
  { Career: "career.png" },
  { Finance: "finance.png" },
  { Health: "health.png" },
  { Future: "future.png" },
  { Study: "study.png" },
  { Family: "family.png" },
]

module.exports = {
  absPath: __dirname,
  companyDetails,
  validPages,
  validSigns,
  horoscopeCategories,
  tarotCards,
};