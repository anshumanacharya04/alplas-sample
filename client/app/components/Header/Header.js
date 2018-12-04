import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/">Home</Link>

    <nav>
      <Link to="/helloworld">Hello World</Link>
    </nav>

    <nav>
      <Link to="/1325/Categories">Categories</Link>
    </nav>

    <nav>
      <Link to="/1325/SubCategories">Sub Categories</Link>
    </nav>

    <nav>
      <Link to="/1325/SubSubCategories">Sub Sub Categories</Link>
    </nav>

    <hr />
  </header>
);

export default Header;
