import Portfolio from "@/components/Portfolio";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohamed El-Ghazoui",
  jobTitle: "Étudiant ingénieur en Informatique et Réseaux",
  email: "mailto:elghazoui.md@gmail.com",
  telephone: "+212 6 82 44 49 21",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Rue Mohammadia Appt 20, 5 Etg, Hassan Rt",
    postalCode: "10000",
    addressLocality: "Rabat",
    addressCountry: "MA"
  },
  alumniOf: "EMSI Rabat",
  sameAs: [
    "https://www.linkedin.com/in/mohamed-el-ghazoui",
    "https://github.com/Med-EL-GHAZOUI"
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Portfolio />
    </>
  );
}
