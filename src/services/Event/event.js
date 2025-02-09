import { REQUEST_URL } from '../../data/constant';


export const CREATE_EVENT = async (eventData) => {
  try {
    console.log("eventData", eventData);

    const response = await fetch(
        `${REQUEST_URL}/event/create`,

        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(eventData),
          }
      );

    return await response.json();

  } catch (error) {
    console.error("Error creating event",error.message)
  }
};



export const EVENT_DETAILS = async (id) => {
  try {
    const response = await fetch(`${REQUEST_URL}/event/${id}/event-stats`, {
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

export const ALL_EVENTS = async () => {
  try {
    const response = await fetch(`${REQUEST_URL}/event/all-events`, {
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

export const JOIN_EVENT = async (id) => {
  try {
    const response = await fetch(`${REQUEST_URL}/event/${id}/join`, {
      credentials: "include",
    });

    return await response.json();
  } catch (error) {
    console.error("Error joining event:", error);
  }
};
