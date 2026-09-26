/**
 * YADEA Pakistan — authorised 3S store directory.
 *
 * Transcribed from YADEA Pakistan's published service-centre guide. Every
 * store name, address and phone number below appears verbatim in that
 * source. YADEA describes the network as 40+ dealerships; the directory
 * published on the site lists the following.
 *
 * No coordinates are published by the source, so none are invented here.
 * "Get directions" links are generated from the published street address.
 */

export type Dealer = {
  name: string;
  city: string;
  address: string;
  phones: string[];
};

export type Region = {
  id: string;
  name: string;
  dealers: Dealer[];
};

const dealer = (name: string, city: string, address: string, ...phones: string[]): Dealer => ({
  name,
  city,
  address,
  phones,
});

export const regions: Region[] = [
  {
    id: "central-punjab",
    name: "Central Punjab",
    dealers: [
      dealer("Yadea Pine Avenue", "Lahore", "46 Main Pine Avenue Road, Near Valencia", "0322-233-7767"),
      dealer("Yadea Centre Akbar Chowk", "Lahore", "Near Standard Chartered Bank, Akbar Chowk", "0335-116-0207"),
      dealer("Yadea Naseer and Sons", "Lahore", "122/A, Allama Iqbal Road, Garhi Shahu", "042-3636-8128", "0339-420-6758"),
      dealer("Yadea Bedian Motors", "Lahore", "516, Leel Bedian Road, Near Petrol Pump", "0321-453-6992", "0317-428-8366"),
      dealer("Yadea Lahore", "Lahore", "19 Jahanzaib Block, Allama Iqbal Town, Near Scheme Morr", "0311-499-7713"),
      dealer("Yadea AA Corporation", "Lahore", "Shop #191, Sheikhupura Road, Near Meezan Bank, Shahdara Morr", "0322-943-7588"),
      dealer("Yadea Nicholson Road", "Lahore", "Near New Ittefaq Cargo, Nicholson Road", "0311-608-9578"),
      dealer("Yadea Bhatta Chowk, Ibrahim Traders", "Lahore", "E42-3, New Airport Road, Lahore Cantt", "0333-444-4342"),
      dealer("Yadea Expo Center", "Lahore", "Near Emporium Mall, Abdul Haque Road, Phase 2, Johar Town", "0300-836-5060"),
      dealer("Yadea Central Park", "Lahore", "A-53, Commercial Main Boulevard, Near Dubai Islamic Bank, Central Park Housing Scheme, Ferozepur Road", "0321-445-9821"),
      dealer("Yadea Allah Abad, AR Electric Wheels", "Allahabad", "Chunian Road, Near Lahori Marriage Hall, Theengmore", "0301-883-6316"),
      dealer("Yadea Kasur", "Kasur", "Old Lari Adda, Near Rangers Public School, Kasur", "0321-400-2242"),
      dealer("Yadea AG & Sons", "Pattoki", "Main Multan Road, Near Al Falah Bank, Pattoki", "0300-475-2035"),
      dealer("Yadea Bismillah Autos", "Okara", "Citya Business Center, GT Road, Okara", "0321-777-2222", "0300-414-0164"),
      dealer("Yadea Sahiwal, Shani Traders", "Sahiwal", "Church Road, Sahiwal", "0345-666-2000"),
      dealer("Yadea Arifwala", "Arifwala", "Thana Bazar, Near JS Bank, Arifwala", "0300-033-0712"),
      dealer("Yadea Nankana", "Nankana Sahib", "Shora Kothi Road, Hira Chowk, Nankana", "0300-848-5226"),
      dealer("Yadea A.R.S Traders", "Faisalabad", "Shop #86-87, Hassan Commercial Market, East Canal Road", "0321-660-0002", "0324-660-0001"),
      dealer("Yadea A.R.S Traders", "Faisalabad", "Jail Road, Jinnah Colony, Faisalabad", "0321-660-0002", "0324-660-0001"),
      dealer("Yadea Welcome Motors", "Burewala", "Opposite Ladies and Children Park, Afaq Khan Chowk", "0313-772-0800", "0300-772-0800"),
      dealer("Yadea Welcome Motors", "Vehari", "V Chowk, Near PSO Pump, Burewala Road, Vehari", "0312-629-1293", "0332-843-6800"),
      dealer("Yadea Waqas Motors", "Bhalwal", "Purana Lak Mor, Sargodha Mor, Near Manzoor Petroleum", "0300-111-9998"),
      dealer("Yadea Nizam Autos", "Chiniot", "Main Jhang Road, Near Munir Honda Centre, Chiniot", "0300-143-4149"),
      dealer("Yadea Toba Tek Singh, SAW Enterprises", "Toba Tek Singh", "80/2 Shanza Leeza Centre, Allama Iqbal Road", "0345-777-7708", "0345-757-4333"),
      dealer("Yadea Pirmahal, Mian Traders", "Pirmahal", "Thana Mor, Rajana Road, Pirmahal", "0300-119-2332"),
    ],
  },
  {
    id: "gujranwala",
    name: "Gujranwala Region",
    dealers: [
      dealer("Yadea Gujranwala", "Gujranwala", "Opposite Sabzi Mandi, Kot Shahan, Near DC Colony, Main GT Road", "0315-766-7021", "0325-933-5566"),
      dealer("Yadea Friends Autos", "Jhelum", "Machine Mohalla No. 2, Near K&Ns & MCB Bank, Jhelum", "0335-555-1330"),
      dealer("Yadea Sialkot", "Sialkot", "Hassan Manzil, Kashmir Road, Pakka Garha Ghumman", "0321-558-3623", "0303-593-5333"),
      dealer("Yadea Doburji", "Sialkot", "Doburji Chowk Pull, Opposite Sony Tower, Sialkot", "0340-422-1339"),
      dealer("Yadea Wazirabad", "Wazirabad", "Double Phatak, Sialkot Road, Wazirabad", "0322-646-2750"),
      dealer("Yadea Gujrat Centre", "Gujrat", "Purani Fruit Mandi, GT Road, Gujrat", "0310-720-3057", "0304-837-1069"),
      dealer("Yadea Gujrat Bhimber Road", "Gujrat", "Near Qasar-e-Noor Marriage Hall, Bhimber Road", "0300-621-7685"),
      dealer("Yadea Sambrial", "Sambrial", "Street No. 11, Sialkot Road, Sambrial", "0333-872-7980", "0302-872-7980"),
      dealer("Yadea Mandi Bahauddin", "Mandi Bahauddin", "Phalian Road, Mandi Bahauddin", "0300-621-7685"),
    ],
  },
  {
    id: "multan",
    name: "Multan Region",
    dealers: [
      dealer("Yadea Flagship Store", "Multan", "Hassan Abad Gate No. 2, Near Euro Petroleum Pump, Khanewal Road, Chowk Qazafi", "0300-873-1260", "0301-836-0062"),
      dealer("Yadea Multan (Gulgasht)", "Multan", "Near Multan Pharmacy, ChaseUp Mall, Bosan Road", "0300-873-1260", "0301-836-0062"),
      dealer("Yadea Multan (Dera Adda)", "Multan", "Shop #24, Cream Centre, Hotel Firdous, Chowk Dera Adda", "0300-873-1260", "0301-836-0062"),
      dealer("Yadea Bahawalpur", "Bahawalpur", "Ahmadpur Road, Near Al Falah Bank, Dubai Chowk", "0300-968-5373"),
      dealer("Yadea Shalimar Motors", "Rahim Yar Khan", "Old Bus Stand, Near Belgium Chowk, Rahim Yar Khan", "0333-777-0010"),
      dealer("Yadea Centre", "Dera Ghazi Khan", "DG Khan Bypass Chowk, Near Khosa Corporation", "0336-679-6300", "0334-299-5353"),
      dealer("Yadea Centre", "Dera Ghazi Khan", "Musharaf Chowk, College Road, Block 05, DG Khan", "0337-981-7804", "0336-679-6300"),
      dealer("Yadea Bahawalnagar, Cool Waves", "Bahawalnagar", "Baldia Road, Bahawalnagar", "0321-408-5126"),
      dealer("Yadea Centre Khanewal", "Khanewal", "Block #01, Opposite City Park, Near RCA Chowk", "0300-639-2334"),
      dealer("Umar Traders", "Bhakkar", "Mian Plaza, Jhang Road, Bhakkar", "0335-725-4747"),
      dealer("Yadea Lodhran, Shahzad Sajjad Traders", "Lodhran", "Khanewal Road, Opposite Al Badar Hospital", "0300-827-4746"),
      dealer("Yadea Alipur", "Alipur", "Al Manan Garden, Alipur, District Muzaffargarh", "0305-700-9004"),
    ],
  },
  {
    id: "north",
    name: "North Region",
    dealers: [
      dealer("Yadea Chakwal", "Chakwal", "New GPO, Talla-Gang Road, Chakwal", "0323-595-5941"),
      dealer("Yadea Attock", "Attock", "Kamra Road, Attock", "0327-540-2626"),
      dealer("Yadea Centre", "Taxila", "Nawababad, Near Gulberg Colony, Opposite Virtual University, GT Road, Wah Cantt", "0313-567-0007", "0333-929-9996"),
      dealer("Yadea Rawalpindi", "Rawalpindi", "Plot A, Survey No. 260, Mareer Chowk, Murree Road", "0336-555-0747"),
      dealer("Yadea Bahria, Rawalpindi", "Rawalpindi", "Plaza #27, Mini Extension 1, Bahria Town Phase VII", "0333-583-2251"),
      dealer("Yadea Rawat", "Rawat", "Near Wateem Dental College, GT Road, Rawat", "0343-856-0001"),
      dealer("Yadea Capital Motors", "Islamabad", "Khokhar Plaza, Koral Chowk Service Road, Ghauri Model Town", "0319-720-6386"),
      dealer("Yadea Electric Bikes", "Islamabad", "Near Aspire College, Sector G-12, Islamabad", "0316-585-0734", "0331-508-8554"),
      dealer("Yadea Kohat", "Kohat", "Near College Town, Pindi Road, Kohat", "0332-960-0565"),
      dealer("United Quaidabad Motors", "Quaidabad", "Khushab Road, Quaid Abad", "0301-677-9277"),
      dealer("Yadea Haripur", "Haripur", "Thapla Plaza, Main Chowk, Sec No. 01, Khalabat Township", "0300-811-2266"),
      dealer("Yadea Peshawar", "Peshawar", "Asghar Plaza, Lower Tehkaal Payan, University Road", "0348-255-2525"),
      dealer("Yadea Daniyal Autos", "Peshawar", "Main GT Road, Opposite Gulbahar Police Station, Service Road, Bilal Town", "0316-955-8883", "0313-958-0094"),
      dealer("Yadea Bike", "Swabi", "Dildar Plaza, TCS Office, Swabi", "0344-922-9335"),
      dealer("Yadea Mardan", "Mardan", "Malakand Chowk, Near Shaheen Hospital, Mardan", "0334-555-9939"),
      dealer("Yadea Swat", "Swat", "Shop #01, Muhammad Shah Plaza, New Sabzi Mandi, Madeen Road, Mingora", "0347-196-0801", "0301-360-8282"),
      dealer("Yadea Matta", "Swat", "J. Zaks Corporation, Near Jalal Advocate Colony Chowk, Matta, Swat", "0326-570-9031"),
      dealer("Yadea Jauharabad, Asad Motors", "Jauharabad", "Bank Alfalah Road, Near Stylo Shoes, Opposite Bank Al Habib Islamic, District Khushab", "0300-099-0051"),
      dealer("Yadea Sargodha", "Sargodha", "House #157, Street #02, Millatabad, Sargodha", "0315-600-0136"),
    ],
  },
  {
    id: "south",
    name: "South Region",
    dealers: [
      dealer("Yadea Sitara Auto Impex", "Karachi", "Showroom 1, Rabia Manzil, Plot #341-P, AM-18, Akbar Road", "0333-210-4417"),
      dealer("Yadea Ideal Enterprises", "Karachi", "Plot #C-31, Shop #1, Block-B, Pakistan Homes, New Rashidi Goth, Gulistan-e-Johar", "0300-820-8385"),
      dealer("Yadea Nawab Autos", "Karachi", "AM-20, Akbar Road, Saddar, Karachi", "0320-028-2577"),
      dealer("Yadea Hasnain Motors", "Khairpur", "Old National Highway, Karachi Road, New Hyder Departmental Store, Khairpur Mir's", "0330-946-4791"),
      dealer("Yadea Gambat, WM Motors", "Gambat", "Main National Highway, Adjacent to Dr. Ziaddin Hospital Laboratory, Gambat", "0300-325-4549"),
    ],
  },
];

export const allDealers: (Dealer & { regionId: string; regionName: string })[] = regions.flatMap((r) =>
  r.dealers.map((d) => ({ ...d, regionId: r.id, regionName: r.name })),
);

export const allCities = Array.from(new Set(allDealers.map((d) => d.city))).sort((a, b) => a.localeCompare(b));

export const storeCount = allDealers.length;

export function searchDealers(query: string, regionId: string | null) {
  const q = query.trim().toLowerCase();
  return allDealers.filter((d) => {
    if (regionId && d.regionId !== regionId) return false;
    if (!q) return true;
    return (
      d.name.toLowerCase().includes(q) ||
      d.city.toLowerCase().includes(q) ||
      d.address.toLowerCase().includes(q)
    );
  });
}

/** Google Maps directions generated from the published street address. */
export function directionsUrl(d: Dealer): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.name}, ${d.address}, Pakistan`)}`;
}
