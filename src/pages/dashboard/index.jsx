import { Container } from "./style.js";
import { UserRecipes } from "../../components/Templates/UserRecipes";
import { UserSavedRecipes } from "../../components/Templates/UserSavedRecipes";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Api } from "../../services/api.js";
import RecipeCard from "../../components/Templates/RecipeCard/index.jsx";
import { RecipesContext } from "../../Providers/models/recipes/recipes.jsx";

function DashBoard() {
  const [myRecipes, setMyRecipes] = useState(null);

  const [open, setOpen] = useState(false);
  const [buttonfilter, setButtonfilter] = useState("userRecipes");
  const { recipes } = useContext(RecipesContext);

  useEffect(() => {
    console.log(recipes);
    const id = localStorage.getItem("@Easy:Id");
    const newRecipes = recipes?.filter((e) => e.userId === id);
    console.log(newRecipes);
    setMyRecipes(newRecipes);
  }, []);

  const clickOnCard = (e) => {
    setOpen(true);
    console.log(e.target);
  };

  return (
    <>
      <Container>
        <div className="buttonsDiv">
          <button
            onClick={() => {
              setButtonfilter("userRecipes");
            }}
            className="button"
          >
            Minhas Receitas
          </button>
          <button
            onClick={() => {
              setButtonfilter("savedRecipes");
            }}
            className="button"
          >
            Receitas Salvas
          </button>
          <button className="button">Ingredientes</button>
        </div>

        <div className="dashboardContent">
          {buttonfilter === "userRecipes" ? (
            <UserRecipes onClick={clickOnCard} />
          ) : null}
          {buttonfilter === "savedRecipes" ? (
            <UserSavedRecipes onClick={clickOnCard} />
          ) : null}
        </div>
        {console.log({ myRecipes })}
        {myRecipes?.map((e) => (
          <RecipeCard key={e.id} recipe={e} del />
        ))}
      </Container>
    </>
  );
}

export default DashBoard;
