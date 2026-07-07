// Auto-generated content data for the dining guide.
// Restaurant "records" live here as data, not hand-authored HTML.

const STATE_ORDER = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

const CITY_ORDER = ["Santa Fe", "Taos", "Albuquerque", "New York City"];

const CITY_META = {
  "Santa Fe": {"cls": "sf", "emoji": "🔵", "label": "Santa Fe", "dates": "July 13–16 & July 19–21", "state": "New Mexico"},
  "Taos": {"cls": "taos", "emoji": "🟢", "label": "Taos", "dates": "July 16–17", "state": "New Mexico"},
  "Albuquerque": {"cls": "abq", "emoji": "🟠", "label": "Albuquerque", "dates": "July 17–20", "state": "New Mexico"},
  "New York City": {"cls": "", "emoji": "", "label": "New York City", "dates": "", "state": "New York"},
};

// New Mexico is the trip's main destination — open by default; New York (bonus stop) stays collapsed.
const DEFAULT_OPEN_STATES = ["New Mexico"];

const RESTAURANTS = [
  {
    "city": "santa-fe",
    "tags": [
      "vegan",
      "walkin"
    ],
    "name": "Annapurna's World Vegetarian Cafe",
    "type": "Ayurvedic · Vegetarian/Vegan · 1624 Cerrillos Rd",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌱 Fully Vegan / Vegetarian"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Walk-in OK"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "Cardamom pancakes with coconut and almonds, best chai in Santa Fe. Full GF/DF bakery. Opens 7 AM — ideal departure-day breakfast before heading to the airport.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://www.chaishoppe.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.chaishoppe.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "santa-fe",
    "tags": [
      "vegan",
      "meat",
      "reserve",
      "chase"
    ],
    "name": "Arroyo Vino",
    "type": "Farm-to-Table · 218 Camino La Tierra",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌿 Vegan-Friendly"
      },
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve 1–2 weeks ahead"
      }
    ],
    "chase": "⚡ Chase",
    "resNote": "⚠️ Tue–Sat only, seatings 5–8 PM. Book before Opera night (Jul 14).",
    "desc": "Seasonal farm-to-table with an attached wine shop. Always has a veggie main. Best sunset views in Santa Fe. Great pre-Opera dinner. Kitchen garden sourced.",
    "links": [
      {
        "cls": "link-opentable",
        "href": "https://www.opentable.com/arroyo-vino",
        "text": "🔴 OpenTable"
      },
      {
        "cls": "link-menu",
        "href": "https://arroyovino.com",
        "text": "📋 Menu (seasonal)"
      },
      {
        "cls": "link-website",
        "href": "https://arroyovino.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "santa-fe",
    "tags": [
      "meat",
      "walkin"
    ],
    "name": "The Bull Ring",
    "type": "Classic Chophouse · 150 Washington Ave",
    "badges": [
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Walk-in OK"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "Santa Fe institution since 1975. Prime rib, classic cuts, full bar, power lunch crowd. Good late-night option near the Plaza. Longtime local favorite.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://www.thebullringsantafe.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.thebullringsantafe.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "santa-fe",
    "tags": [
      "vegan",
      "walkin"
    ],
    "name": "Cafecito",
    "type": "Casual · Vegan-Friendly · 500 Old Santa Fe Trail",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌱 Fully Vegan Options"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Walk-in OK"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "Beautiful patio, vegan \"three sisters\" empanadas, De La Tierra bowl (lentils, cauliflower, beets, squash, kale). Great lunch spot near Museum Hill.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://cafecitosantafe.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://cafecitosantafe.com",
        "text": "🌐 Website"
      },
      {
        "cls": "link-call",
        "href": "tel:+15059860500",
        "text": "📞 Call"
      }
    ]
  },
  {
    "city": "santa-fe",
    "tags": [
      "vegan",
      "meat",
      "walkin"
    ],
    "name": "El Farol",
    "type": "Spanish Tapas · Canyon Road · 808 Canyon Rd",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌿 Vegan-Friendly"
      },
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Bar walk-in"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "Spanish tapas with flamenco dancing and live entertainment on Canyon Road. Vegan options among the small plates. Great last-night vibe. Oldest restaurant in Santa Fe.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://elfarolsf.com/menus/",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://elfarolsf.com",
        "text": "🌐 Website"
      },
      {
        "cls": "link-call",
        "href": "tel:+15059839912",
        "text": "📞 Call for Res"
      }
    ]
  },
  {
    "city": "santa-fe",
    "tags": [
      "vegan",
      "meat",
      "reserve",
      "chase"
    ],
    "name": "Geronimo",
    "type": "Fine Dining · Canyon Road · 724 Canyon Rd",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌿 Vegan-Friendly"
      },
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve ASAP"
      }
    ],
    "chase": "⚡ Chase",
    "resNote": "⚠️ Books 2–3 weeks out in July. Reserve immediately.",
    "desc": "NM's only Mobil 4-Star & AAA 4-Diamond. Elk tenderloin, bison, seasonal vegetarian tasting menu. 1756 adobe home on Canyon Road. Best last-night splurge in Santa Fe.",
    "links": [
      {
        "cls": "link-opentable",
        "href": "https://www.opentable.com/geronimo-santa-fe",
        "text": "🔴 OpenTable"
      },
      {
        "cls": "link-menu",
        "href": "https://www.geronimorestaurant.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.geronimorestaurant.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "santa-fe",
    "tags": [
      "vegan",
      "meat",
      "reserve",
      "chase"
    ],
    "name": "Horno Restaurant",
    "type": "Gastropub · Near Plaza · 95 W Marcy St",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌿 Vegan-Friendly"
      },
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve a few days ahead"
      }
    ],
    "chase": "⚡ Chase",
    "resNote": null,
    "desc": "James Beard-nominated Chef David Sellers. Upscale gastropub, seasonal world-inspired small plates. Vegan dumplings + vegan chocolate cake. Al fresco patio. Steps from the Plaza.",
    "links": [
      {
        "cls": "link-opentable",
        "href": "https://www.opentable.com/r/horno-restaurant-santa-fe",
        "text": "🔴 OpenTable"
      },
      {
        "cls": "link-menu",
        "href": "https://www.hornorestaurant.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.hornorestaurant.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "santa-fe",
    "tags": [
      "meat",
      "reserve",
      "chase"
    ],
    "name": "La Plazuela at La Fonda",
    "type": "New Mexican · Inside La Fonda on the Plaza · 100 E San Francisco St",
    "badges": [
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve for dinner"
      }
    ],
    "chase": "⚡ Chase",
    "resNote": "⚠️ Breakfast & lunch are walk-in only; dinner reservations recommended.",
    "desc": "Historic 1920s indoor courtyard with skylights, steps from the Plaza. Innovative New Mexican classics — tortilla soup, tableside guacamole, enchiladas, filet mignon. Santa Fe's most romantic dining room.",
    "links": [
      {
        "cls": "link-opentable",
        "href": "https://www.opentable.com/la-plazuela-at-la-fonda-on-the-plaza",
        "text": "🔴 OpenTable"
      },
      {
        "cls": "link-menu",
        "href": "https://lafondasantafe.com/dinner-menu/",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://lafondasantafe.com/la-plazuela/",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "santa-fe",
    "tags": [
      "vegan",
      "meat",
      "reserve",
      "chase"
    ],
    "name": "Paloma",
    "type": "Contemporary Mexican · 401 S Guadalupe St",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌿 Vegan-Friendly"
      },
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve same/next day"
      }
    ],
    "chase": "⚡ Chase",
    "resNote": null,
    "desc": "Scratch-made masa, mezcal-forward bar, vivid Mexican-inspired menu. Cauliflower dishes for vegans, solid meat mains. Free parking after 6 PM. Open late kitchen.",
    "links": [
      {
        "cls": "link-opentable",
        "href": "https://www.opentable.com/r/paloma-santa-fe",
        "text": "🔴 OpenTable"
      },
      {
        "cls": "link-menu",
        "href": "https://paloma-sf.com/menus",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://paloma-sf.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "santa-fe",
    "tags": [
      "vegan",
      "meat",
      "reserve",
      "chase"
    ],
    "name": "Restaurant Martin",
    "type": "Fine Dining · Contemporary American · 526 Galisteo St",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌿 Vegan-Friendly"
      },
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve ahead"
      }
    ],
    "chase": "⚡ Chase",
    "resNote": null,
    "desc": "James Beard finalist for Best Chef Southwest (multiple years). French technique meets NM ingredients. Organic meats, local produce. Beautiful patio. Family-owned.",
    "links": [
      {
        "cls": "link-opentable",
        "href": "https://www.opentable.com/restaurant-martin",
        "text": "🔴 OpenTable"
      },
      {
        "cls": "link-menu",
        "href": "https://restaurantmartinsantafe.com/menus/",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://restaurantmartinsantafe.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "santa-fe",
    "tags": [
      "meat",
      "walkin"
    ],
    "name": "Rio Chama Prime Steakhouse",
    "type": "Steakhouse · 414 Old Santa Fe Trail",
    "badges": [
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Bar seating available"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "Santa Fe's top steakhouse. Prime rib, bone-in ribeye, filet mignon, oysters to start. Great for pre-Opera dinner. Full bar. Classic Santa Fe atmosphere.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://www.riochamasteakhouse.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.riochamasteakhouse.com",
        "text": "🌐 Website"
      },
      {
        "cls": "link-call",
        "href": "tel:+15059554949",
        "text": "📞 Call for Res"
      }
    ]
  },
  {
    "city": "santa-fe",
    "tags": [
      "vegan",
      "reserve",
      "chase"
    ],
    "name": "Santa Fe Teahouse & Bistro",
    "type": "Bistro · Top of Canyon Road · 821 Canyon Rd",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌿 Vegan-Friendly"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve or walk-in"
      }
    ],
    "chase": "⚡ Chase",
    "resNote": null,
    "desc": "80+ teas, espresso drinks, and tea-infused cocktails from a 99% gluten-free scratch kitchen with vegetarian and vegan options. Dog-friendly garden patio, frequent live music. Open Wed–Sun, 8 AM–3 PM.",
    "links": [
      {
        "cls": "link-opentable",
        "href": "https://www.opentable.com/r/santa-fe-teahouse-and-bistro-santa-fe",
        "text": "🔴 OpenTable"
      },
      {
        "cls": "link-menu",
        "href": "https://www.santafeteahouse.com/pages/breakfast",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.santafeteahouse.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "santa-fe",
    "tags": [
      "vegan",
      "walkin"
    ],
    "name": "Sweetwater Harvest Kitchen",
    "type": "Vegan / GF · 1512 Pacheco St",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌱 Fully Vegan"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Walk-in OK"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "Dedicated gluten-free facility. Daily specials, mushroom tea lattes, vegan and paleo options. Fine dining quality meets cozy café vibe. Great for breakfast or lunch.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://www.sweetwaterharvestkitchen.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.sweetwaterharvestkitchen.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "santa-fe",
    "tags": [
      "vegan",
      "walkin"
    ],
    "name": "Tomasita's",
    "type": "Classic NM · 500 S Guadalupe St",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌿 Vegan-Friendly"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Walk-in (expect wait)"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "Best beans in Santa Fe (vegan). Authentic New Mexican: green/red chile, smothered burritos, enchiladas. No-frills, cash-only vibe. Locals love it. Expect a line.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://www.tomasitas.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.tomasitas.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "taos",
    "tags": [
      "meat",
      "walkin"
    ],
    "name": "5 Star Burgers",
    "type": "Burgers · 1032 Paseo Del Pueblo Sur",
    "badges": [
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Walk-in OK"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "USA Today \"Best Burger in New Mexico.\" Hormone-free Angus beef ground daily. Green chile cheeseburger is the move. Casual, quick, excellent. Great lunch before driving to ABQ.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://www.5starburgers.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.5starburgers.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "taos",
    "tags": [
      "vegan",
      "meat",
      "walkin"
    ],
    "name": "Bent Street Grille",
    "type": "American Bistro · 120 Bent St",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌿 Vegan-Friendly"
      },
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Walk-in OK"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "Casual country-style brunch & lunch. Authentic northern NM flavors, scratch-made sauces. Best breakfast/lunch spot in Taos. Vegan and meat options throughout.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://bentstreetgrille.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://bentstreetgrille.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "taos",
    "tags": [
      "vegan",
      "meat",
      "reserve"
    ],
    "name": "La Luna @ La Fonda",
    "type": "Indigenous Fine Dining · Taos Plaza",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌿 Vegan-Friendly"
      },
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve ahead"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "One of only a handful of US restaurants dedicated to elevated Indigenous cuisine. Ancestral ingredients from North, Central and South America. Unique & unforgettable.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://lafondetaos.com/dining",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://lafondetaos.com",
        "text": "🌐 Website"
      },
      {
        "cls": "link-call",
        "href": "tel:+15757582211",
        "text": "📞 Call for Res"
      }
    ]
  },
  {
    "city": "taos",
    "tags": [
      "meat",
      "reserve"
    ],
    "name": "Lambert's of Taos",
    "type": "Fine Dining · 309 Paseo Del Pueblo Sur",
    "badges": [
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve ahead (Las Fiestas wknd)"
      }
    ],
    "chase": null,
    "resNote": "⚠️ Very busy Jul 17–19 during Las Fiestas. Book in advance.",
    "desc": "Fine dining since 1989. CAB petit filet mignon, duck breast, buffalo tenderloin. Tree-shaded patio. Upscale but relaxed. Taos's most reliable fine dining institution.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://lambertsoftaos.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://lambertsoftaos.com",
        "text": "🌐 Website"
      },
      {
        "cls": "link-call",
        "href": "tel:+15757589009",
        "text": "📞 Call for Res"
      }
    ]
  },
  {
    "city": "taos",
    "tags": [
      "vegan",
      "meat",
      "reserve"
    ],
    "name": "The Love Apple",
    "type": "Organic · Farm-to-Table · 803 Paseo Del Pueblo Norte",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌿 Vegan-Friendly"
      },
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve ASAP · Phone Only"
      }
    ],
    "chase": null,
    "resNote": "⚠️ No OpenTable — call (575) 751-0050. Fills every night in July. Reserve now.",
    "desc": "Intimate restaurant in a converted 1800s chapel. Gnocchi with carrot butter (vegan), duck breast, lamb albondigas. Wed–Sun, 5–9 PM only. One of the best in NM.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://theloveapple.net/pdf/love_apple_taos_dinner_menu.pdf",
        "text": "📋 Menu (PDF)"
      },
      {
        "cls": "link-website",
        "href": "https://theloveapple.net",
        "text": "🌐 Website"
      },
      {
        "cls": "link-phone",
        "href": "tel:+15757510050",
        "text": "📞 (575) 751-0050"
      }
    ]
  },
  {
    "city": "albuquerque",
    "tags": [
      "vegan",
      "walkin"
    ],
    "name": "Annapurna's World Vegetarian Cafe",
    "type": "Ayurvedic · Multiple Locations",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌱 Fully Vegan / Vegetarian"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Walk-in OK"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "Ayurvedic Indian — cardamom pancakes, tofu scramble, South Indian sampler, Lebanese wrap. GF and sugar-free bakery. Where this mini-chain started (2002). Multiple ABQ locations.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://www.chaishoppe.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.chaishoppe.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "albuquerque",
    "tags": [
      "meat",
      "walkin"
    ],
    "name": "Antiquity Restaurant",
    "type": "Wild Game · Steakhouse · Old Town · 112 Romero St NW",
    "badges": [
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Walk-in OK"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "Old Town ABQ institution in a landmark 1785 building. Wild game, seasonal meats, hand-crafted margaritas. 47+ years serving exceptional steaks in a historic adobe. Santos lounge inside.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://www.antiquityrestaurant.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.antiquityrestaurant.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "albuquerque",
    "tags": [
      "vegan",
      "meat",
      "reserve"
    ],
    "name": "Artichoke Cafe",
    "type": "Contemporary American · 424 Central Ave SE",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌿 Vegan-Friendly"
      },
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve for weekends"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "One of ABQ's most beloved gathering places. New American with French/Italian influences. Always a vegan option on the rotating menu. Great wine bar. Retro-cool EDO neighborhood.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://www.artichokecafe.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.artichokecafe.com",
        "text": "🌐 Website"
      },
      {
        "cls": "link-call",
        "href": "tel:+15052431301",
        "text": "📞 Call for Res"
      }
    ]
  },
  {
    "city": "albuquerque",
    "tags": [
      "vegan",
      "meat",
      "reserve",
      "chase"
    ],
    "name": "Campo at Los Poblanos",
    "type": "Farm-to-Table · 4803 Rio Grande Blvd NW",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌿 Vegan-Friendly"
      },
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve 2–3 weeks out"
      }
    ],
    "chase": "⚡ Chase",
    "resNote": "⚠️ Most sought-after reservation in ABQ. Book immediately for Jul 18 or 19.",
    "desc": "Farm-to-table on 10-acre organic lavender farm. Rio Grande Valley cuisine, seasonal organic ingredients. Stunning outdoor patio. Vegan and meat dishes equally exceptional.",
    "links": [
      {
        "cls": "link-website",
        "href": "https://lospoblanos.com/dining/campo-reservations",
        "text": "🔴 Reserve Online"
      },
      {
        "cls": "link-menu",
        "href": "https://lospoblanos.com/dining/campo-menus",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://lospoblanos.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "albuquerque",
    "tags": [
      "meat",
      "reserve",
      "chase"
    ],
    "name": "Char at Hotel Andaluz",
    "type": "Contemporary NM · 125 2nd St NW",
    "badges": [
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve on weekends"
      }
    ],
    "chase": "⚡ Chase",
    "resNote": null,
    "desc": "NM's only Josper charcoal grill. Live-fire meats and contemporary NM cuisine. Built inside Conrad Hilton's 1939 hotel. Rooftop G. Toti bar with skyline views. Best hotel dining in ABQ.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://hotelandaluz.com/dining/char",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://hotelandaluz.com/dining",
        "text": "🌐 Website"
      },
      {
        "cls": "link-call",
        "href": "tel:+15052423900",
        "text": "📞 Call for Res"
      }
    ]
  },
  {
    "city": "albuquerque",
    "tags": [
      "vegan",
      "meat",
      "walkin"
    ],
    "name": "Farina Pizza",
    "type": "Pizza · 510 Central Ave SE",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌱 Vegan Options"
      },
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Walk-in OK"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "Potentially the best pizza outside NYC. Vegan cheese and vegan crusts available. Lively bar, Nob Hill neighborhood energy. Next-door sister restaurant to Artichoke Cafe.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://www.farinabistro.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.farinabistro.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "albuquerque",
    "tags": [
      "vegan",
      "walkin"
    ],
    "name": "Itality: Plant Based Foods",
    "type": "Indigenous Vegan · 2500 12th St NW, Unit E",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌱 Fully Vegan"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Counter Service"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "Indigenous vegan restaurant in Avanyu Plaza. NDN tacos with fry bread, blue corn waffles, OG nachos supreme with quinoa. Counter-order, dine-in patio or to-go. No reservations — call ahead to confirm hours (Wed–Sun).",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://www.italitynm.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.italitynm.com",
        "text": "🌐 Website"
      },
      {
        "cls": "link-call",
        "href": "tel:+15054512861",
        "text": "📞 Call"
      }
    ]
  },
  {
    "city": "albuquerque",
    "tags": [
      "vegan",
      "meat",
      "reserve",
      "chase"
    ],
    "name": "Seasons Rotisserie & Grill",
    "type": "Casual Elegant · Old Town · 2031 Mountain Rd NW",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌿 Vegan-Friendly"
      },
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve on weekends"
      }
    ],
    "chase": "⚡ Chase",
    "resNote": null,
    "desc": "ABQ's top mixed-diet restaurant. Wood-burning rotisserie, Kobe ribeye, jumbo scallops, vegan polenta. Rooftop patio with Happy Hour Wed–Sun. Overlooks Old Town.",
    "links": [
      {
        "cls": "link-opentable",
        "href": "https://www.opentable.com/r/seasons-rotisserie-and-grill-albuquerque",
        "text": "🔴 OpenTable"
      },
      {
        "cls": "link-menu",
        "href": "https://www.seasonsabq.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://www.seasonsabq.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "albuquerque",
    "tags": [
      "vegan",
      "walkin"
    ],
    "name": "Squeezed Juice Bar",
    "type": "Raw / Juice Bar · Northeast Heights",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌱 Raw / Vegan"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Walk-in OK"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "Best raw food stop in ABQ. Locally owned, farm-to-table fresh juices, acai bowls, smoothies. Fully vegetarian with strong vegan options. Great morning stop.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://squeezedjuicebar.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://squeezedjuicebar.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "albuquerque",
    "tags": [
      "vegan",
      "walkin"
    ],
    "name": "Vegos",
    "type": "Plant-Based Mexican · Nob Hill",
    "badges": [
      {
        "cls": "badge-vegan",
        "text": "🌱 Fully Vegan"
      },
      {
        "cls": "badge-walkin",
        "text": "🚶 Walk-in OK · Wed–Sun"
      }
    ],
    "chase": null,
    "resNote": null,
    "desc": "Plant-based Mexican with authentic spices. Papaya salad and fresh rolls great for raw vegans. Local favorite. Open Wed–Sun only — plan ahead for your ABQ weekend.",
    "links": [
      {
        "cls": "link-menu",
        "href": "https://vegosabq.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://vegosabq.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "albuquerque",
    "tags": [
      "vegan",
      "meat",
      "reserve",
      "chase"
    ],
    "name": "Vintage 423",
    "type": "Steakhouse · 423 Central Ave NW",
    "badges": [
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve ahead on weekends"
      }
    ],
    "chase": "⚡ Chase",
    "resNote": null,
    "desc": "ABQ's premier steakhouse. USDA Prime & Choice cuts, Wine Spectator-honored wine list, craft cocktails. \"Best filet in a long while.\" Upscale but welcoming. Downtown Route 66.",
    "links": [
      {
        "cls": "link-opentable",
        "href": "https://www.opentable.com/vintage-423-reservations-albuquerque",
        "text": "🔴 OpenTable"
      },
      {
        "cls": "link-menu",
        "href": "https://vintage423.com/menu",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://vintage423.com",
        "text": "🌐 Website"
      }
    ]
  },
  {
    "city": "new-york-city",
    "tags": [
      "meat",
      "reserve"
    ],
    "name": "Ambassadors Clubhouse",
    "type": "Northern Indian · NoMad · 1245 Broadway",
    "badges": [
      {
        "cls": "badge-meat",
        "text": "🥩 Carnivore Pick"
      },
      {
        "cls": "badge-res",
        "text": "📅 Reserve via Resy only"
      }
    ],
    "chase": null,
    "resNote": "⚠️ No OpenTable, phone, or walk-in (except same-day cancellations). Resy releases tables twice a month: 1st for days 1–15, 15th for the rest of the month.",
    "desc": "Punjab-inspired Northern Indian cuisine — papads & chaat, tandoor & kebabs, biryani & pilau — served with theatrical tableside flair in Manhattan's NoMad neighborhood.",
    "links": [
      {
        "cls": "link-resy",
        "href": "https://resy.com/cities/new-york-ny/venues/ambassadors-clubhouse-new-york",
        "text": "⚫ Resy"
      },
      {
        "cls": "link-menu",
        "href": "https://ambassadorsclubhouse.com/newyork/food-drink/",
        "text": "📋 Menu"
      },
      {
        "cls": "link-website",
        "href": "https://ambassadorsclubhouse.com/newyork/",
        "text": "🌐 Website"
      }
    ]
  }
];
