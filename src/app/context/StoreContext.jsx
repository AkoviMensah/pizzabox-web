import { createContext, useContext, useState } from "react";

export const StoreContext = createContext(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error("We are not inside the provider")
    }
    return context
}

export function StoreProvider({ children }) {
    const [basket, setBasket] = useState(null)

    function removeItem(pizzaId, quantity) {
        if (!basket) return;
        const items = [...basket.tems];
        const itemIndex = items.findIndex(i => i.pizzaId === pizzaId)
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setBasket(prevState => {
                return { ...prevState, items }
            })
        }
    }

    return (
        <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
            {children}
        </StoreContext.Provider>
    )
}