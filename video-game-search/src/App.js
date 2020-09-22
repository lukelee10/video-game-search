import React from 'react';
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, Results, SearchBox } from '@elastic/react-search-ui';
import { Layout } from '@elastic/react-search-ui-views';
import '@elastic/react-search-ui-views/lib/styles/styles.css';

import logo from './logo.svg';
import './App.css';

// Step #2, The connector
const connector = new AppSearchAPIConnector({
  searchKey: 'search-a1nvinehmdbn22si37q5qxmq',
  engineName: "video-gamess",
  hostIdentifier: "https://aeff287d888c491f8d6927ff36caddcc.ent-search.us-central1.gcp.cloud.es.io"
});
// Step #3: Configuration options
const configurationOptions = {
  apiConnector: connector,
  searchQuery: {
    search_fields: {
      // 1. Search by name of video game.
      name: {}
    },
    // 2. Results: name, genre, publisher, scores, and platform.
    result_fields: {
      name: {
        // A snippet means that matching search terms will be wrapped in <em> tags.
        snippet: {
          size: 75, // Limit the snippet to 75 characters.
          fallback: true // Fallback to a "raw" result.
        }
      },
      genre: {
        snippet: {
          size: 50,
          fallback: true
        }
      },
      publisher: {
        snippet: {
          size: 50,
          fallback: true
        }
      },
      critic_score: {
        // Scores are numeric, so we won't snippet.
        raw: {}
      },
      user_score: {
        raw: {}
      },
      platform: {
        snippet: {
          size: 50,
          fallback: true
        }
      },
      image_url: {
        raw: {}
      }
    },
    // 3. Facet by scores, genre, publisher, and platform, which we'll use to build filters later.
    facets: {
      user_score: {
        type: "range",
        ranges: [
          { from: 0, to: 5, name: "Not good" },
          { from: 5, to: 7, name: "Not bad" },
          { from: 7, to: 9, name: "Pretty good" },
          { from: 9, to: 10, name: "Must play!" }
        ]
      },
      critic_score: {
        type: "range",
        ranges: [
          { from: 0, to: 50, name: "Not good" },
          { from: 50, to: 70, name: "Not bad" },
          { from: 70, to: 90, name: "Pretty good" },
          { from: 90, to: 100, name: "Must play!" }
        ]
      },
      genre: { type: "value", size: 100 },
      publisher: { type: "value", size: 100 },
      platform: { type: "value", size: 100 }
    }
  }
};
// Step #4, SearchProvider: The finishing touches
export default function App() {
  return (
    <SearchProvider config={configurationOptions}>
      <div className="App">
        <Layout
          header={<SearchBox />}
          // titleField is the most prominent field within a result: the result header.
          bodyContent={<Results titleField="name" urlField="image_url" />}
        />
      </div>
    </SearchProvider>
  );
}

