import Link from "next/link";

function Index() {
  return (
    <div>
      <h1>La Foulée</h1>
      <div>
        <ul>
          <li>
            <Link href="/event/[slug]" as="/event/trail-de-test">
              <a>Page event: Trail de test</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Index;
