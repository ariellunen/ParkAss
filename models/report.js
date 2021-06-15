class Report {
    constructor(id,userId, date, imageUrl, lat,lng, address, desc) {
      this.id = id;
      this.userId = userId;
      this.date = date;
      this.imageUrl = imageUrl;
      this.lat = lat;
      this.lng = lng;
      this.address = address;
      this.desc = desc;
    }
  }
  
  export default Report;