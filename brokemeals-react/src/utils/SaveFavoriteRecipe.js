import { getAuth } from "firebase/auth";
import { ref, get, update } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

    export function SaveFavoriteRecipe(recipe) {

        const user = getAuth().currentUser;
        if (!user) {
            alert("You must be logged in to save a recipe!");
            return;
        }
        
        const uid = getAuth().currentUser.uid;
        const userRef = ref(database, `/users/${uid}`);

        // Get a snapshot of the user's data
        get(userRef).then((snapshot) => {
            const userData = snapshot.val();
            // If they have any favorites, we'll use them. If not, we create an array for the user.
            let currentFavorites = userData.favorites || [];
            // Check if the recipe is already favorited to avoid duplicates
            if (!currentFavorites.includes(recipe.id)) {
                const updatedFavorites = [...currentFavorites, recipe.id];
            // Update it in the firebase
            update (userRef, { favorites: updatedFavorites }).then(() => alert(`${recipe.name} saved to favorites!`));
            }
            else {
                alert("Recipe already saved!")
            }
        });
    }