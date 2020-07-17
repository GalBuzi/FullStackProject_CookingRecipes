const express = require("express");
const router = express.Router();
const db = require("./db");

exports.insertToFamilyTable = async function () {
  let username = "galbuz";
  let stringRecipe1 = {
    id: 11,
    RecipeOwner: "galbuz",
    Occasion: ["Friday dinner"],
    title: "Lemon Garlic Rice",
    readyInMinutes: 25,
    aggregateLikes: 124,
    ingredients: [
      {
        name: "chicken stock",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591294555/Instant-Pot-Chicken-Stock-finished-4x5-2_st7rit.jpg",
        amount: {
          metric: {
            value: "400",
            unit: "ml",
          },
        },
      },
      {
        name: "basmati rice",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591294664/basmati_cwj8cu.jpg",
        amount: {
          metric: {
            value: "200",
            unit: "gr",
          },
        },
      },
      {
        name: "butter",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591295611/butter_ou2zx9.jpg",
        amount: {
          metric: {
            value: "60",
            unit: "gr",
          },
        },
      },
      {
        name: "minced fresh garlic",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591295672/minced_garlic_wjndgh.jpg",
        amount: {
          metric: {
            value: "13",
            unit: "gr",
          },
        },
      },
      {
        name: "lemon juice",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591295977/lemon_juice_r0rgsp.jpg",
        amount: {
          metric: {
            value: "13",
            unit: "gr",
          },
        },
      },
      {
        name: "black pepper",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591296142/black_pepper_otlw5a.jpg",
        amount: {
          metric: {
            value: "13",
            unit: "gr",
          },
        },
      },
    ],
    instructions: [
      {
        step: "1",
        instruction:
          "Combine stock, rice, butter, garlic, and lemon juice into pot. Bring to a boil over medium heat.",
      },
      {
        step: "2",
        instruction: "Cover with lid and reduce heat to medium-low.",
      },
      {
        step: "3",
        instruction:
          "Simmer until stock is absorbed and rice is tender — about 15 minutes.",
      },
      {
        step: "4",
        instruction:
          "Turn off heat. Add pepper. Sprinkle with parsley, if using, and stir well.",
      },
    ],
    image:
      "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591296675/result_temkgf.jpg",
    servings: 4,
    vegan: true,
    vegetarian: true,
    glutenFree: false,
  };
  let jsonRecipe1 = JSON.stringify(stringRecipe1);
  await db.insertFamilyRecipe(username, jsonRecipe1);
  let stringRecipe2 = {
    id: 22,
    RecipeOwner: "galbuz",
    Occasion: ["Lunch"],
    title: "Baked Chipotle Chicken Thighs",
    readyInMinutes: 40,
    aggregateLikes: 100,
    ingredients: [
      {
        name: "bone-in, skin-on chicken thighs",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591297662/thighs_l558qs.jpg",
        amount: {
          metric: {
            value: "1",
            unit: "kg",
          },
        },
      },
      {
        name: "canned chipotle peppers in adobo sauce",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591297840/canned_chipotle_peppers_in_adobo_sauce_hghzgj.jpg",
        amount: {
          metric: {
            value: "800",
            unit: "gr",
          },
        },
      },
      {
        name: "adobo sauce",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591295611/butter_ou2zx9.jpg",
        amount: {
          metric: {
            value: "13",
            unit: "gr",
          },
        },
      },
      {
        name: "minced fresh garlic",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591295672/minced_garlic_wjndgh.jpg",
        amount: {
          metric: {
            value: "13",
            unit: "gr",
          },
          us: {
            value: "1",
            unit: "tablespoon",
          },
        },
      },
      {
        name: "onion powder",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591298034/onion_powder_bt9sir.jpg",
        amount: {
          metric: {
            value: "13",
            unit: "gr",
          },
        },
      },
      {
        name: "chili powder",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591298087/chili_powder_xvkpdx.jpg",
        amount: {
          metric: {
            value: "26",
            unit: "gr",
          },
        },
      },
      {
        name: "dried oregano",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591298214/dried_oregano_z2xxqo.jpg",
        amount: {
          metric: {
            value: "13",
            unit: "gr",
          },
        },
      },
      {
        name: "salt",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591298289/salt_x9gq6s.jpg",
        amount: {
          metric: {
            value: "7",
            unit: "gr",
          },
        },
      },
      {
        name: "black pepper",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591296142/black_pepper_otlw5a.jpg",
        amount: {
          metric: {
            value: "7",
            unit: "gr",
          },
        },
      },
      {
        name: "olive oil",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591298498/olive_oil_vvpb44.jpg",
        amount: {
          metric: {
            value: "40",
            unit: "ml",
          },
        },
      },
    ],
    instructions: [
      {
        step: "1",
        instruction:
          "Dice chipotle peppers and add to bowl along with adobo sauce.",
      },
      {
        step: "2",
        instruction:
          "Add remaining MARINADE ingredients. Mix well in bowl, or pulse in food processor, until combined.",
      },
      {
        step: "3",
        instruction:
          "Place chicken and marinade into bag and seal, making sure chicken is well coated. Let marinate in refrigerator at least three hours, flipping the bag over at least once.",
      },
      {
        step: "4",
        instruction:
          "Set oven to 400 degrees Fahrenheit. Transfer marinated chicken and marinade to baking dish.  Bake until chicken has an internal temperature of 165 degrees and is fork tender–about 30 minutes.",
      },
    ],
    image:
      "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591298680/Baked_Chipotle_Chicken_Thighs_qarcw1.jpg",
    servings: 4,
    vegan: false,
    vegetarian: false,
    glutenFree: false,
  };
  let jsonRecipe2 = JSON.stringify(stringRecipe2);
  await db.insertFamilyRecipe(username, jsonRecipe2);
  let stringRecipe3 = {
    id: 33,
    RecipeOwner: "galbuz",
    Occasion: ["Breakfast"],
    title: "Tomato Avocado Toast with Eggs",
    readyInMinutes: 5,
    aggregateLikes: 84,
    ingredients: [
      {
        name: "slices whole wheat bread, toasted",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591299156/slices_whole_wheat_bread_toasted_pl3lm9.jpg",
        amount: {
          metric: {
            value: "200",
            unit: "gr",
          },
        },
      },
      {
        name: "avocado",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591299467/avocado_kxqgi2.jpg",
        amount: {
          metric: {
            value: "200",
            unit: "gr",
          },
        },
      },
      {
        name: "egg",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591299598/2_eggs_vyxuwm.jpg",
        amount: {
          metric: {
            value: "100",
            unit: "gr",
          },
        },
      },
      {
        name: "tomato",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591299712/Tomato_yvzjwr.jpg",
        amount: {
          metric: {
            value: "85",
            unit: "gr",
          },
        },
      },
    ],
    instructions: [
      {
        step: "1",
        instruction: "Place a slice of toast on each plate.",
      },
      {
        step: "2",
        instruction:
          "Melt butter in skillet over medium heat. Meanwhile, place avocado in mixing bowl and mash thoroughly. Set bowl aside.",
      },
      {
        step: "3",
        instruction:
          "Carefully crack an egg into melted butter on one side of skillet. Repeat with second egg on opposite side of skillet. " +
          "Let eggs cook until whites are nearly set – about 2 minutes. Meanwhile, spread mashed avocado across both pieces of toast.",
      },
      {
        step: "4",
        instruction:
          "Flip eggs and let cook until over medium – about 1 minute. " +
          "Meanwhile, slice tomato, then distribute slices to lay across each piece of avocado toast.",
      },
      {
        step: "5",
        instruction: " Top each piece of tomato avocado toast with fried egg.",
      },
    ],
    image:
      "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591299825/tomato-avocado-toast-with-eggs1_zzgbdq.jpg",
    servings: 2,
    vegan: true,
    vegetarian: false,
    glutenFree: false,
  };

  let jsonRecipe3 = JSON.stringify(stringRecipe3);
  await db.insertFamilyRecipe(username, jsonRecipe3);

  let username1 = "shayek";
  let stringRecipe4 = {
    id: 44,
    RecipeOwner: "shayek",
    Occasion: ["Passover holiday"],
    title: "Green Beans Marinara",
    readyInMinutes: 40,
    aggregateLikes: 123,
    ingredients: [
      {
        name: "green beans",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591303307/green_beans_fmrv3i.jpg",
        amount: {
          metric: {
            value: "450",
            unit: "gr",
          },
        },
      },
      {
        name: "olive oil",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591298498/olive_oil_vvpb44.jpg",
        amount: {
          metric: {
            value: "26",
            unit: "ml",
          },
        },
      },
      {
        name: "garlic paste",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591303307/green_beans_fmrv3i.jpg",
        amount: {
          metric: {
            value: "13",
            unit: "gr",
          },
        },
      },
      {
        name: "crushed red pepper flakes",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591303455/crushed_red_pepper_flakes_gnba1b.jpg",
        amount: {
          metric: {
            value: "7",
            unit: "gr",
          },
        },
      },
      {
        name: "crushed tomatoes",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591303514/crushed_tomatoes_zsoceb.jpg",
        amount: {
          metric: {
            value: "600",
            unit: "gr",
          },
        },
      },
      {
        name: "dried basil",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591303640/dried_basil_eqf4yr.jpg",
        amount: {
          metric: {
            value: "13",
            unit: "gr",
          },
        },
      },
      {
        name: "dried oregano",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591298214/dried_oregano_z2xxqo.jpg",
        amount: {
          metric: {
            value: "13",
            unit: "gr",
          },
        },
      },
      {
        name: "salt",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591298289/salt_x9gq6s.jpg",
        amount: {
          metric: {
            value: "13",
            unit: "gr",
          },
        },
      },
    ],
    instructions: [
      {
        step: "1",
        instruction:
          "Snip off tips of green beans, then rinse well under cold water.",
      },
      {
        step: "2",
        instruction: "Steam green beans until bright green—about 10 minutes.",
      },
      {
        step: "3",
        instruction:
          "Meanwhile, combine oil, garlic, and pepper in pot over medium heat. " +
          "Cook for 30 seconds, stirring well.",
      },
      {
        step: "4",
        instruction:
          "Add tomatoes, basil, and oregano to pot. " +
          "Season with salt, then stir well. Reduce heat to low and simmer 10 minutes.",
      },
      {
        step: "5",
        instruction:
          "Stir in steamed green beans and add more salt to taste. " +
          "Raise heat to medium and cook 10 minutes or until green beans reach desired tenderness.",
      },
    ],
    image:
      "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591304787/greenbeans_ecfwn2.jpg",
    servings: 4,
    vegan: true,
    vegetarian: true,
    glutenFree: true,
  };
  let jsonRecipe4 = JSON.stringify(stringRecipe4);
  await db.insertFamilyRecipe(username1, jsonRecipe4);

  let stringRecipe5 = {
    id: 55,
    RecipeOwner: "shayek",
    Occasion: ["Friday dinner"],
    title: "Roasted Brussels Sprouts",
    readyInMinutes: 35,
    aggregateLikes: 45,
    ingredients: [
      {
        name: "Brussels sprouts",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591339586/Brussels_sprouts_focgtr.jpg",
        amount: {
          metric: {
            value: "450",
            unit: "gr",
          },
        },
      },
      {
        name: "olive oil",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591298498/olive_oil_vvpb44.jpg",
        amount: {
          metric: {
            value: "26",
            unit: "ml",
          },
        },
      },
      {
        name: "salt",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591298289/salt_x9gq6s.jpg",
        amount: {
          metric: {
            value: "13",
            unit: "gr",
          },
        },
      },
      {
        name: "black pepper",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591296142/black_pepper_otlw5a.jpg",
        amount: {
          metric: {
            value: "13",
            unit: "gr",
          },
        },
      },
    ],
    instructions: [
      {
        step: "1",
        instruction:
          "Set oven to 400 degrees Fahrenheit. " +
          "In colander, wash Brussels sprouts under cold running water, discarding any yellow leaves. " +
          "Shake off excess water. Reserve any green leaves that fall off.",
      },
      {
        step: "2",
        instruction:
          "Slice off and discard about 1/2 inch of woody ends, then cut sprouts in half. " +
          "(Quarter any sprouts that are significantly larger than the others.)",
      },
      {
        step: "3",
        instruction:
          "Transfer sprouts and leaves to bowl. " +
          "Drizzle with oil, then season with salt and pepper. Mix by hand until sprouts are well coated.",
      },
      {
        step: "4",
        instruction:
          "Spread in single layer on prepared pan and roast " +
          "until well-browned and fork-tender—about 25 minutes.",
      },
    ],
    image:
      "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591339759/brusselsprout_fiiu4l.jpg",
    servings: 4,
    vegan: true,
    vegetarian: true,
    glutenFree: true,
  };
  let jsonRecipe5 = JSON.stringify(stringRecipe5);
  await db.insertFamilyRecipe(username1, jsonRecipe5);

  let stringRecipe6 = {
    id: 66,
    RecipeOwner: "shayek",
    Occasion: ["Friday dinner"],
    title: "Flourless Peanut Butter Cookies",
    readyInMinutes: 30,
    aggregateLikes: 67,
    ingredients: [
      {
        name: "egg",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591299598/2_eggs_vyxuwm.jpg",
        amount: {
          metric: {
            value: "50",
            unit: "gr",
          },
        },
      },
      {
        name: "peanut butter",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591340185/peanut_butter_ohf7eq.png",
        amount: {
          metric: {
            value: "256",
            unit: "ml",
          },
        },
      },
      {
        name: "brown sugar",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591340245/brown_sugar_cmv0et.jpg",
        amount: {
          metric: {
            value: "128",
            unit: "gr",
          },
        },
      },
      {
        name: "baking soda",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591340959/baking_soda_j9p1m4.jpg",
        amount: {
          metric: {
            value: "7",
            unit: "gr",
          },
        },
      },
      {
        name: "vanilla extract",
        image:
          "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591341017/vanilla_extract_ckw0is.jpg",
        amount: {
          metric: {
            value: "7",
            unit: "gr",
          },
        },
      },
    ],
    instructions: [
      {
        step: "1",
        instruction: "Set oven to 350 degrees. Beat egg in bowl.",
      },
      {
        step: "2",
        instruction:
          "Add peanut butter, sugar, baking soda, and vanilla. Beat until well blended.",
      },
      {
        step: "3",
        instruction:
          "Scoop dough by coffee scoop, roll into balls, and place onto prepared pan.",
      },
      {
        step: "4",
        instruction:
          "Use fork to flatten each ball into a disc in a crosshatch pattern, " +
          "then bake until edges are golden brown—about 10 minutes.",
      },
      {
        step: "5",
        instruction:
          "Let cookies stand until firm—about 10 minutes—then transfer to rack until cooled completely.",
      },
    ],
    image:
      "https://res.cloudinary.com/dc5voqqvz/image/upload/v1591341115/flourless-peanut-butter-cookies_o9icbq.jpg",
    servings: 13,
    vegan: true,
    vegetarian: true,
    glutenFree: true,
  };
  let jsonRecipe6 = JSON.stringify(stringRecipe6);
  await db.insertFamilyRecipe(username1, jsonRecipe6);
};
