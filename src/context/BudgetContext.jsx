import { createContext, useContext, useState } from "react";

const BudgetContext = createContext();

function BudgetProvider({children}){
    const [budgetMode, setBudgetMode] = useState("");

    const valueBudgetContext = {
        budgetMode,
        setBudgetMode,
    }
    return (
        <BudgetContext value={valueBudgetContext}>
            {children}
        </BudgetContext>
    )
}

function useBudget(){
    const value = useContext(BudgetContext);
    return value;
}

export {BudgetProvider, useBudget}