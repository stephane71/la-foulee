import { useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";

function Index({ foo, fooAction }) {
  useEffect(() => {fooAction();});
  return (
    <div>
      <h1>La Foulée</h1>
      <div>{foo}</div>
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

const mapStateToProps = state => ({
  foo: state.foo
});

const mapDispatchToProps = dispatch => ({
  fooAction: () => dispatch({ type: "FOO", payload: "Hello le monde" })
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
