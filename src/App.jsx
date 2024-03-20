import "./styles.css";
// import Board from "../src/components/task/taskComponent";
import Board from "./components/board/Board";
import { MantineProvider } from "@mantine/core";

// export default function App() {
//   return (
//     <div className="App">
//       <h1>App Component</h1>
//       <Board />
//     </div>
//   );
// }

export default function App() {
  return (
    <div className="App">
      <div className="background-container"></div>
      <div className="main-container">
        <header className="app-header">
          <h1>ToDo List</h1>
        </header>

        <main>
          {/* <h2> App page</h2> */}
          <MantineProvider>
            <Board />
          </MantineProvider>
        </main>
      </div>
    </div>
  );
}
