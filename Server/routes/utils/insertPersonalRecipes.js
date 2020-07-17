const express = require("express");
const router = express.Router();
const db = require("./db");

exports.insertToPersonalTable = async function () {
  let username = "galbuz";
  let stringRecipe1 = {
    id: 111,
    RecipeOwner: "galbuz",
    Occasion: "Breakfast",
    title: "Egg & mango chutney flatbreads",
    readyInMinutes: 12,
    aggregateLikes: 6547,
    ingredients: [
      {
        name: "egg",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591299598/2_eggs_vyxuwm.jpg",
        amount: {
          metric: {
            value: "200",
            unit: "gr",
          },
        },
      },
      {
        name: "self-raising flour",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591341814/self-raising_flour_bizq00.jpg",
        amount: {
          metric: {
            value: "100",
            unit: "gr",
          },
        },
      },
      {
        name: "natural yoghurt",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591341894/natural_yoghurt_lbttwi.jpg",
        amount: {
          metric: {
            value: "87",
            unit: "gr",
          },
        },
      },
      {
        name: "mango chutney",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591341961/mango_chutney_qyzeu6.jpg",
        amount: {
          metric: {
            value: "26",
            unit: "gr",
          },
        },
      },
      {
        name: "fresh red chilli",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591342005/fresh_red_chilli_hbcvpn.jpg",
        amount: {
          metric: {
            value: "30",
            unit: "gr",
          },
        },
      },
    ],
    instructions: [
      {
        step: "1",
        instruction:
          "Lower the eggs into a pan of vigorously simmering water and boil for 5½ minutes exactly, " +
          "then refresh under cold water until cool enough to handle, and peel.",
      },
      {
        step: "2",
        instruction:
          "Meanwhile, put a large non-stick frying pan on a medium-high heat.",
      },
      {
        step: "3",
        instruction:
          "In a bowl, mix the flour with a little pinch of sea salt, 4 tablespoons of yoghurt and 1 tablespoon of olive oil until you have a dough. " +
          "Halve, then roll out each piece on a flour-dusted surface until just under ½cm thick.",
      },
      {
        step: "4",
        instruction: "Cook for 3 minutes, or until golden, turning halfway.",
      },
      {
        step: "5",
        instruction:
          "Dot the mango chutney and remaining yoghurt over the breads.",
      },
      {
        step: "6",
        instruction:
          "Halve the soft-boiled eggs and arrange on top, smashing them in with a fork, if you like.",
      },
      {
        step: "7",
        instruction:
          "Finely slice the chilli and scatter over (as much as you dare!), " +
          "drizzle with a little extra virgin olive oil and season with salt and black pepper from a height.",
      },
    ],
    image:
      "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591342136/55846381_c6ps64.jpg",
    servings: 2,
    vegan: true,
    vegetarian: true,
    glutenFree: false,
  };
  let jsonRecipe1 = JSON.stringify(stringRecipe1);
  await db.insertPersonalRecipe(username, jsonRecipe1);

  let stringRecipe2 = {
    id: 222,
    RecipeOwner: "galbuz",
    Occasion: "Lunch",
    title: "Chicken noodle stir-fry",
    readyInMinutes: 16,
    aggregateLikes: 7541,
    ingredients: [
      {
        name: "unsalted peanuts",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591342426/unsalted_peanuts_jioy2l.jpg",
        amount: {
          metric: {
            value: "30",
            unit: "gr",
          },
        },
      },
      {
        name: "free-range skinless chicken breasts",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591342536/free-range_skinless_chicken_breasts_wx7nzc.jpg",
        amount: {
          metric: {
            value: "120",
            unit: "gr",
          },
        },
      },
      {
        name: "black bean sauce",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591342583/black_bean_sauce_utvkn0.jpg",
        amount: {
          metric: {
            value: "26",
            unit: "gr",
          },
        },
      },
      {
        name: "medium free-range egg noodles",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591342638/medium_free-range_egg_noodles_oecy7u.jpg",
        amount: {
          metric: {
            value: "150",
            unit: "gr",
          },
        },
      },
      {
        name: "tenderstem broccoli",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591342675/tenderstem_broccoli_rw5of5.jpg",
        amount: {
          metric: {
            value: "200",
            unit: "gr",
          },
        },
      },
    ],
    instructions: [
      {
        step: "1",
        instruction:
          "Place a large non-stick frying pan on a medium heat and toast the peanuts as it heats up, " +
          "tossing regularly, then remove and set aside, leaving the pan on the heat.",
      },
      {
        step: "2",
        instruction:
          "Meanwhile, score the chicken lengthways at 1cm intervals, going about halfway through.",
      },
      {
        step: "3",
        instruction:
          "In a bowl, toss the chicken with 1 tablespoon each of olive oil, red wine vinegar and black bean sauce to coat. " +
          "Cook in the hot pan for 3 minutes on each side, or until dark, gnarly and cooked through.",
      },
      {
        step: "4",
        instruction:
          "Cook the noodles in a large pan of boiling salted water according to the packet instructions.",
      },
      {
        step: "5",
        instruction:
          "Trim the broccoli (halving any thick stalks lengthways) and add to the water for the last 2 minutes.",
      },
      {
        step: "6",
        instruction:
          "Remove the chicken to a board. Use tongs to carefully drag the just-cooked noodles and broccoli with a bit of their water straight into the frying pan.",
      },
      {
        step: "7",
        instruction:
          "Pound half the peanuts in a pestle and mortar until fine, toss into the pan with the remaining black bean sauce until well mixed, then divide between your plates.",
      },
      {
        step: "8",
        instruction:
          "Slice the chicken and place on top, scatter over the remaining peanuts, drizzle with a little extra virgin olive oil, and dig in.",
      },
    ],
    image:
      "https://res.cloudinary.com/dc5voqqvz/image/upload/v1593621655/Chicken_noodle_stir-fry_gnanok.jpg",

    servings: 2,
    vegan: true,
    vegetarian: true,
    glutenFree: false,
  };
  let jsonRecipe2 = JSON.stringify(stringRecipe2);
  await db.insertPersonalRecipe(username, jsonRecipe2);

  let stringRecipe3 = {
    id: 333,
    RecipeOwner: "galbuz",
    Occasion: "holidays",
    title: "Epic rib-eye steak",
    readyInMinutes: 26,
    aggregateLikes: 8541,
    ingredients: [
      {
        name: "rib-eye steak",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591343210/piece_of_rib-eye_steak_jxphmy.jpg",
        amount: {
          metric: {
            value: "600",
            unit: "gr",
          },
        },
      },
      {
        name: "sprigs of fresh rosemary",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591343871/sprigs_of_fresh_rosemary_mcgx1e.jpg",
        amount: {
          metric: {
            value: "25",
            unit: "gr",
          },
        },
      },
      {
        name: "cloves of garlic",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591343968/cloves_of_garlic_favvld.jpg",
        amount: {
          metric: {
            value: "25",
            unit: "gr",
          },
        },
      },
      {
        name: "mixed mushrooms",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591344017/mixed_mushrooms_dhz135.jpg",
        amount: {
          metric: {
            value: "350",
            unit: "gr",
          },
        },
      },
      {
        name: "white beans",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591344126/white_beans_rjp978.jpg",
        amount: {
          metric: {
            value: "200",
            unit: "gr",
          },
        },
      },
    ],
    instructions: [
      {
        step: "1",
        instruction:
          "Place a large non-stick frying pan on a medium-high heat.",
      },
      {
        step: "2",
        instruction:
          "Rub the steak all over with a pinch of sea salt and black pepper, " +
          "then sear on all sides for 10 minutes in total, so you achieve good colour on the outside but keep it " +
          "medium rare in the middle, or cook to your liking, turning regularly with tongs.",
      },
      {
        step: "3",
        instruction:
          "Meanwhile, strip the rosemary leaves off the sprigs, peel and finely slice the garlic, and tear up any larger mushrooms.",
      },
      {
        step: "4",
        instruction:
          "When the steak’s done, remove to a plate and cover with tin foil.",
      },
      {
        step: "5",
        instruction:
          "Reduce the heat under the pan to medium, and crisp up the rosemary for 30 seconds, " +
          "then add the garlic and mushrooms and cook for 8 minutes, or until golden, tossing regularly.",
      },
      {
        step: "6",
        instruction:
          "Pour in the beans and their juice, add 1 tablespoon of red wine vinegar and simmer for 5 minutes, then season to perfection.",
      },
      {
        step: "7",
        instruction:
          "Sit the steak on top and pour over any resting juices. Slice and serve at the table, finishing with a little extra virgin olive oil, if you like.",
      },
    ],
    image:
      "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591344725/rib-eye-steak_peek1k.jpg",
    servings: 2,
    vegan: false,
    vegetarian: false,
    glutenFree: false,
  };
  let jsonRecipe3 = JSON.stringify(stringRecipe3);
  await db.insertPersonalRecipe(username, jsonRecipe3);

  let username1 = "shayek";
  let stringRecipe4 = {
    id: 444,
    RecipeOwner: "shayek",
    Occasion: "holidays",
    title: "Berry meringue ripple",
    readyInMinutes: 8,
    aggregateLikes: 2475,
    ingredients: [
      {
        name: "vanilla ice cream",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591345102/vanilla_ice_cream_imwlki.jpg",
        amount: {
          metric: {
            value: "300",
            unit: "gr",
          },
        },
      },
      {
        name: "blueberries",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591345121/blueberries_ztqav3.jpg",
        amount: {
          metric: {
            value: "200",
            unit: "gr",
          },
        },
      },
      {
        name: "shop-bought meringues",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591345138/shop-bought_meringues_sxtqqx.jpg",
        amount: {
          metric: {
            value: "80",
            unit: "gr",
          },
        },
      },
      {
        name: "raspberries",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591345169/raspberries_lhg7of.jpg",
        amount: {
          metric: {
            value: "100",
            unit: "gr",
          },
        },
      },
      {
        name: "dark chocolate",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591345207/dark_chocolate_70_beq2bg.jpg",
        amount: {
          metric: {
            value: "25",
            unit: "gr",
          },
        },
      },
    ],
    instructions: [
      {
        step: "1",
        instruction: "Get your ice cream out of the freezer.",
      },
      {
        step: "2",
        instruction:
          "Put the blueberries into a non-stick frying pan with a splash of water and place on a high heat for 2 minutes, " +
          "or until they all start to burst and get jammy, then remove from the heat.",
      },
      {
        step: "3",
        instruction:
          "Layering up as you like, crumble the meringues between glasses or bowls, " +
          "halve and add the raspberries and a nice round scoop of ice cream to each, " +
          "then spoon over the jammy blueberries and their juices.",
      },
      {
        step: "4",
        instruction:
          "Shave or grate over a little chocolate and tuck in, rippling it all together in a wonderful collision of flavours.",
      },
    ],
    image:
      "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591345523/Berry_meringue_ripple_tjx57u.jpg",
    servings: 2,
    vegan: true,
    vegetarian: false,
    glutenFree: true,
  };
  let jsonRecipe4 = JSON.stringify(stringRecipe4);
  await db.insertPersonalRecipe(username1, jsonRecipe4);

  let stringRecipe5 = {
    id: 555,
    RecipeOwner: "shayek",
    Occasion: "holidays",
    title: "Honey berry filo smash",
    readyInMinutes: 14,
    aggregateLikes: 3154,
    ingredients: [
      {
        name: "sheets of filo pastry",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591345821/sheets_of_filo_pastry_qtkehl.jpg",
        amount: {
          metric: {
            value: "100",
            unit: "gr",
          },
        },
      },
      {
        name: "runny honey",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591345875/runny_honey_iwfaah.jpg",
        amount: {
          metric: {
            value: "87",
            unit: "gr",
          },
        },
      },
      {
        name: "shelled pistachios",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591345916/helled_pistachios_v7gbuc.jpg",
        amount: {
          metric: {
            value: "40",
            unit: "gr",
          },
        },
      },
      {
        name: "raspberries",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591345169/raspberries_lhg7of.jpg",
        amount: {
          metric: {
            value: "200",
            unit: "gr",
          },
        },
      },
      {
        name: "Greek-style coconut yoghurt",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591345994/Greek-style_coconut_yoghurt_vhaxwz.jpg",
        amount: {
          metric: {
            value: "400",
            unit: "gr",
          },
        },
      },
    ],
    instructions: [
      {
        step: "1",
        instruction: "Preheat the oven to 180ºC/350ºF/gas 4.",
      },
      {
        step: "2",
        instruction:
          "Lay 1 sheet of filo on an oiled baking tray, " +
          "drizzle with 1 heaped teaspoon of honey from a height, then repeat.",
      },
      {
        step: "3",
        instruction:
          "Lay the final sheet of filo over the top and drizzle with a little olive oil. Scatter over the pistachios, " +
          "then bake for 10 minutes, or until everything is golden.",
      },
      {
        step: "4",
        instruction:
          "Meanwhile, crush half the raspberries with a fork and ripple them through the yoghurt, then divide between your plates.",
      },
      {
        step: "5",
        instruction: "Shake the pistachios on to a board, then lightly crush.",
      },
      {
        step: "6",
        instruction:
          "Snap off pieces of crispy filo and arrange nicely on top of the yoghurt.",
      },
      {
        step: "7",
        instruction:
          "Scatter over the pistachios and remaining raspberries, then drizzle over the remaining honey from a height.",
      },
    ],
    image:
      "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591346113/Honey_berry_filo_smash_ehesxm.jpg",
    dervings: 4,
    vegan: true,
    vegetarian: true,
    glutenFree: false,
  };
  let jsonRecipe5 = JSON.stringify(stringRecipe5);
  await db.insertPersonalRecipe(username1, jsonRecipe5);

  let stringRecipe6 = {
    id: 666,
    RecipeOwner: "shayek",
    Occasion: "lunch",
    title: "Thai-style crispy sea bass",
    readyInMinutes: 19,
    aggregateLikes: 6452,
    ingredients: [
      {
        name: "spring onions",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591346424/spring_onions_zhi7pj.jpg",
        amount: {
          metric: {
            value: "30",
            unit: "gr",
          },
        },
      },
      {
        name: " fresh coriander",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591346467/fresh_coriander_ktutwn.jpg",
        amount: {
          metric: {
            value: "15",
            unit: "gr",
          },
        },
      },
      {
        name:
          "whole sea bass , scaled, gutted, trimmed, from sustainable sources",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591346574/whole_sea_bass_scaled_gutted_trimmed_from_sustainable_sources_luhzx9.jpg",
        amount: {
          metric: {
            value: "600",
            unit: "gr",
          },
        },
      },
      {
        name: "Thai red curry paste",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591346623/Thai_red_curry_paste_qgqbvu.jpg",
        amount: {
          metric: {
            value: "26",
            unit: "gr",
          },
        },
      },
      {
        name: "lime",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591346682/lime_rvccz3.jpg",
        amount: {
          metric: {
            value: "20",
            unit: "ml",
          },
        },
      },
    ],
    instructions: [
      {
        step: "1",
        instruction:
          "Trim and halve the spring onions, finely shred lengthways and place in a bowl of ice-cold water to crisp up. Pick in the coriander leaves, reserving the stalks..",
      },
      {
        step: "2",
        instruction:
          "Place a large non-stick frying pan on a medium-high heat.",
      },
      {
        step: "3",
        instruction:
          "With a sharp knife, score the sea bass skin at 2cm intervals, then rub all over with the curry paste, inside and out, getting into all the cracks and crannies.",
      },
      {
        step: "4",
        instruction:
          "ack the coriander stalks into the cavities, season with sea salt and black pepper, then place in the hot pan with 1 tablespoon of olive oil.",
      },
      {
        step: "5",
        instruction:
          "Cook for 3 to 4 minutes per side, or until dark golden and cooked through (depending on the thickness of your fish).",
      },
      {
        step: "6",
        instruction:
          "Drain and shake off the spring onions and coriander and pile on to your plates.",
      },
      {
        step: "7",
        instruction:
          "Sit the sea bass on top, spooning over any spicy oil from the pan. Finely grate over the lime zest, and serve with lime halves, for squeezing over.",
      },
    ],
    image:
      "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591347064/Thai-style_crispy_sea_bass_d0uwca.jpg",
    servings: 2,
    vegan: false,
    vegetarian: false,
    glutenFree: true,
  };
  let jsonRecipe6 = JSON.stringify(stringRecipe6);
  await db.insertPersonalRecipe(username1, jsonRecipe6);
};
