async function loadDream() {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      console.log("Got geolocation:", lat, long);

      const response = await fetch(`/api/dream?lat=${lat}&long=${long}`);
      const data = await response.json();

      console.log(data);

      document.getElementById("dream").innerText = data.dream;
    },
    (error) => {
      console.error("Error getting geolocation:", error);
      document.getElementById("dream").innerText = "Could not access location";
    },
  );
}

loadDream();
