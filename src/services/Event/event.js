const REQUEST_URL = process.env.REQUEST_URL || "http://localhost:4000"

export const EVENT_DETAILS = async (id) => {
    try{
        const response = await fetch(
            `${REQUEST_URL}/event/${id}/event-stats`, {credentials:"include"}
          );
          return await response.json();
    }catch(error){
        console.error("Error fetching dashboard data:", error);
    }
}

export const ALL_EVENTS = async () => {
    try{
        const response = await fetch (`${REQUEST_URL}/event/all-events`, {credentials:"include"});
          return await response.json();
    }catch(error){
        console.error("Error fetching events:", error);
    }
}

export const JOIN_EVENT = async (id) => {
    try{
        const response = await fetch(
            `${REQUEST_URL}/event/${id}/join`, {credentials: "include"});
            
          return await response.json();
    }catch(error){
        console.error("Error joining event:", error);
    }
}