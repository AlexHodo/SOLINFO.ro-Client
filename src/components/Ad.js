import React from "react";
import Box from "@material-ui/core/Box";

export default class Ad extends React.Component {
  componentDidMount() {
    // (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return <></>;

    return (
      <Box className="ad">
        <ins
          className={`adsbygoogle ${this.props.card && "is-card"}`}
          style={{
            display: "block",
            marginBottom: this.props.marginBottom ? "16px" : 0,
            marginTop: this.props.marginTop ? "16px" : 0,
          }}
          data-ad-client="ca-pub-9101356904433905"
          {...this.props}
        />
      </Box>
    );
  }
}
