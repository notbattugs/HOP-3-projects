import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

const COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      capital
      code
      continent {
        name
      }
      name
      currency
      emoji
      phone
      languages {
        name
      }
    }
  }
`;
const converted = {
  ".button": {
    backgroundColor: "#ffffff00",
    color: "#fff",
    width: "8.5em",
    height: "2.9em",
    border: "#3654ff 0.2em solid",
    borderRadius: "11px",
    textAlign: "right",
    transition: "all 0.6s ease"
  },
  ".button:hover": { backgroundColor: "#3654ff", cursor: "pointer" },
  ".button svg": {
    width: "1.6em",
    margin: "-0.2em 0.8em 1em",
    position: "absolute",
    display: "flex",
    transition: "all 0.6s ease"
  },
  ".button:hover svg": { transform: "translateX(5px)" },
  ".text": { margin: "0 1.5em" }
}


export default function Homes() {
  const router = useRouter();
  const { loading, error, data } = useQuery(COUNTRY, {
    variables: {
      code: `${router.query.id}`,
    },
  });

  if (loading) return <div>Loading</div>;

  if (error) return <div>Error : {error.message}</div>;

  return (
    <main>
      <a href="/">
        <button className="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            ></path>
          </svg>

          <div className="text">Button</div>
        </button>
      </a>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "30px", fontWeight: "500" }}>
          {data.country.continent.name}
        </div>

        <div style={{ fontSize: "170px" }}>{data.country.emoji}</div>

        <div style={{ fontSize: "70px", fontWeight: "600" }}>
          {data.country.name}
        </div>

        <div style={{ fontSize: "60px" }}>
          Capital city: {data.country.capital}
        </div>

        <div style={{ fontSize: "50px" }}>
          Currency: {data.country.currency}
        </div>

        <div style={{ fontSize: "50px", color: "grey", textAlign: "center" }}>
          languages:
          <div style={{ display: "flex", gap: "20px" }}>
            {data.country.languages.map((el: any) => (
              <div>{el.name}</div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: "50px" }}>Phone: {data.country.phone}...</div>
      </main>
    </main>
  );
}
