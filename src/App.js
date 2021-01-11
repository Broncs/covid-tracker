import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/covid.png";
import { Paper, Switch } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

class App extends React.Component {
  state = {
    data: {},
    country: "",
    darkMode: false,
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country, darkMode } = this.state;

    const theme = createMuiTheme({
      palette: {
        type: darkMode ? "dark" : "light",
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <Paper>
          <div className={styles.container}>
            <Switch
              color="primary"
              className={styles.toggle}
              checked={darkMode}
              onChange={() => this.setState({ darkMode: !darkMode })}
            />
            <img className={styles.image} src={coronaImage} alt="COVID-19" />

            <Cards data={data} darkMode={darkMode} />
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <Chart data={data} country={country} darkMode={darkMode} />
          </div>
        </Paper>
      </ThemeProvider>
    );
  }
}

export default App;
