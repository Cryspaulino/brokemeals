import { getAuth } from "firebase/auth";
import { ref, get, update, remove } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

    export function SaveFavoriteRecipe(recipe) {

        const user = getAuth().currentUser;
        if (!user) {
            alert("You must be logged in to save a recipe!");
            return;
        }
        
        const uid = getAuth().currentUser.uid;
        const userRef = ref(database, `/users/${uid}`);
        let currentFavorites;

        // Get a snapshot of the user's data
        get(userRef).then((snapshot) => {
            const userData = snapshot.exists() ? snapshot.val() : {}
            // If they have any favorites, we'll use them. If not, we create an array for the user.
            if (userData.favorites) {
                currentFavorites = userData.favorites;
            }
            else {
                userData.favorites = [];
                currentFavorites = userData.favorites;
            }
            // Check if the recipe is already favorited to avoid duplicates
            if (!currentFavorites.includes(recipe.id)) {
                const updatedFavorites = [...currentFavorites, recipe.id];
            // Update it in the firebase
            update (userRef, { favorites: updatedFavorites }).then(() => 
                alert(`${recipe.name} saved to favorites!`));
            }
            else {
                const removeValue = recipe.id;
                const updatedFavorites = currentFavorites.filter(item => item !== removeValue);
                update (userRef, { favorites: updatedFavorites }).then(() => 
                alert(`${recipe.name} removed from favorites!`));
            }
        });
    }