import Link from "next/link";
import { connect } from "react-redux";

function Index({}) {
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

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
