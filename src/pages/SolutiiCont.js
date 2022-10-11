import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RootContext } from "./../contexts/Context";
import { Link } from "react-router-dom";
import Cont from "./Cont";
import MetaTags from "react-meta-tags";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  Box,
  Tab,
  Tabs,
  Chip,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { DelayedRenderer } from "react-delayed-renderer";

const useStyles = makeStyles((theme) => ({
  header: {
    margin: theme.spacing(3, 0, 0, 0),
    textAlign: "left",
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  solutionContent: {
    width: "100%",
    height: "150px",
    background: "#F6F8FF",
    border: "1px solid #383A3B",
    borderRadius: "5px",
    padding: "0.5rem",
    maxHeight: "150px",
    maxWidth: "100%",
  },
}));

const localeText = {
  noResultsOverlayLabel: "Niciun rezultat.",
  toolbarColumns: "Coloane",
  toolbarFilters: "Filters",
  toolbarFiltersLabel: "Vezi filtrele",
  toolbarFiltersTooltipHide: "Ascunde filtrele",
  toolbarFiltersTooltipShow: "Vezi filtrele",
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtre active` : `${count} filtru activ`,
  columnsPanelTextFieldPlaceholder: "Column title",
  columnsPanelDragIconLabel: "Reorder column",
  columnsPanelShowAllButton: "Arată tot",
  columnsPanelHideAllButton: "Ascunde tot",
  filterPanelAddFilter: "Adaugă foltru",
  filterPanelDeleteIconLabel: "Șterge",
  filterPanelOperators: "Operatori",
  filterPanelOperatorAnd: "Și",
  filterPanelOperatorOr: "Sau",
  filterPanelColumns: "Coloană",
  filterPanelInputLabel: "Valoare",
  filterPanelInputPlaceholder: "Valoare",
  filterOperatorContains: "conține",
  filterOperatorEquals: "este egal cu",
  filterOperatorStartsWith: "începe cu",
  filterOperatorEndsWith: "se termină cu",
  filterOperatorIs: "este",
  filterOperatorNot: "nu este",
  filterOperatorAfter: "este după",
  filterOperatorOnOrAfter: "is on or after",
  filterOperatorBefore: "este înainte",
  filterOperatorOnOrBefore: "is on or before",
  filterValueAny: "oricare",
  filterValueTrue: "adevărat",
  filterValueFalse: "fals",
  columnMenuLabel: "Menu",
  columnMenuShowColumns: "Arată coloane",
  columnMenuFilter: "Filtru",
  columnMenuHideColumn: "Ascunde",
  columnMenuUnsort: "Anulează sortarea",
  columnMenuSortAsc: "Sortează ASC",
  columnMenuSortDesc: "Sortează DESC",
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtre active` : `${count} filtru activ`,
  columnHeaderFiltersLabel: "Arată filtrele",
  columnHeaderSortIconLabel: "Sortează",
  footerTotalRows: "Linii:",
  booleanCellTrueLabel: "adevărat",
  booleanCellFalseLabel: "fals",
  MuiTablePagination: {},
  columnsPanelTextFieldLabel: "Găsește coloană",
  columnsPanelTextFieldPlaceholder: "Titlu coloană",
  columnsPanelShowAllButton: "Arată tot",
  columnsPanelHideAllButton: "Ascunde tot",
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} din ${totalCount.toLocaleString()}`,
  MuiTablePagination: {
    labelRowsPerPage: "Soluții pe pagină",
    labelDisplayedRows: ({ from, to, count }) => `${from}-${to} din ${count}`,
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `-tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

let tabs = [
  {
    title: "Acceptate",
    count: 0,
  },
  {
    title: "Respinse",
    count: 0,
  },
  {
    title: "În așteptare",
    count: 0,
  },
];

const Accepted = (props) => {
  const classes = useStyles();

  let rows = props.data;

  const columns = [
    {
      field: "id",
      headerName: "Soluție",
      width: 125,
      type: "number",
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return (
          <Typography variant="body2">
            <b>sol-{params.row.id}</b>
          </Typography>
        );
      },
    },
    {
      field: "problem_id",
      headerName: "Problemă",
      type: "number",
      align: "left",
      headerAlign: "left",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography
            variant="body2"
            component="a"
            href={`/problema/${params.row.problem_name}`}
            target="_blank"
          >
            #{params.row.problem_id} {params.row.problem_name}
          </Typography>
        );
      },
    },
    {
      field: "content",
      headerName: "Conținut",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        return (
          <textarea
            class={classes.solutionContent}
            defaultValue={params.row.content}
          ></textarea>
        );
      },
    },
    {
      field: "views",
      headerName: "Viz.",
      width: 100,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "rating",
      headerName: "Notă",
      width: 115,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "created",
      headerName: "Informații",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography variant="body2">
            Data acceptării: {params.row.created} <br />
            Acceptată de:{" "}
            {params.row.admin ? (
              <a href={`/profil/${params.row.admin}`} target="_blank">
                @{params.row.admin}
              </a>
            ) : (
              "N/A"
            )}{" "}
            <br />
            Prin extensie: {params.row.from_extension === true
              ? "DA"
              : "NU"}{" "}
            <br />
          </Typography>
        );
      },
    },
  ];

  return (
    <Box>
      {rows.size === 0 ? (
        <Typography align="center">Nimic de afișat.</Typography>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          autoHeight
          rowHeight={175}
          localeText={localeText}
          rowsPerPageOptions={[10, 25, 50, 100, 500]}
          style={{ minWidth: "1000px", overflowX: "auto", overflowY: "hidden" }}
        />
      )}
    </Box>
  );
};

const Rejected = (props) => {
  const classes = useStyles();

  let rows = props.data;

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      type: "number",
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return (
          <Typography variant="body2">
            <b>#{params.row.id}</b>
          </Typography>
        );
      },
    },
    {
      field: "problem_id",
      headerName: "Problemă",
      type: "number",
      align: "left",
      headerAlign: "left",
      width: 200,
      renderCell: (params) => {
        return (
          <Typography
            variant="body2"
            component="a"
            href={`/problema/${params.row.problem_name}`}
            target="_blank"
          >
            #{params.row.problem_id} {params.row.problem_name}
          </Typography>
        );
      },
    },
    {
      field: "content",
      headerName: "Conținut",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        return (
          <textarea
            class={classes.solutionContent}
            defaultValue={params.row.content}
          ></textarea>
        );
      },
    },
    {
      field: "created",
      headerName: "Informații",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography variant="body2">
            Data trimiterii: {params.row.created} <br />
            Respinsă de:{" "}
            {params.row.admin ? (
              <a href={`/profil/${params.row.admin}`} target="_blank">
                @{params.row.admin}
              </a>
            ) : (
              "N/A"
            )}{" "}
            <br />
            Prin extensie: {params.row.from_extension === true
              ? "DA"
              : "NU"}{" "}
            <br />
            Prin import: {params.row.from_import === true ? "DA" : "NU"}{" "}
          </Typography>
        );
      },
    },
  ];

  return (
    <Box>
      {rows.size === 0 ? (
        <Typography align="center">Nimic de afișat.</Typography>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          autoHeight
          rowHeight={175}
          localeText={localeText}
          pageSize={25}
          rowsPerPageOptions={[10, 25, 50, 100, 500]}
          style={{ minWidth: "1000px", overflowX: "auto", overflowY: "hidden" }}
        />
      )}
    </Box>
  );
};

const Awaiting = (props) => {
  const classes = useStyles();

  let rows = props.data;

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      type: "number",
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return (
          <Typography variant="body2">
            <b>#{params.row.id}</b>
          </Typography>
        );
      },
    },
    {
      field: "problem_id",
      headerName: "Problemă",
      type: "number",
      align: "left",
      headerAlign: "left",
      width: 200,
      renderCell: (params) => {
        return (
          <Typography
            variant="body2"
            component="a"
            href={`/problema/${params.row.problem_name}`}
            target="_blank"
          >
            #{params.row.problem_id} {params.row.problem_name}
          </Typography>
        );
      },
    },
    {
      field: "content",
      headerName: "Conținut",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        return (
          <textarea
            class={classes.solutionContent}
            defaultValue={params.row.content}
          ></textarea>
        );
      },
    },
    {
      field: "created",
      headerName: "Informații",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography variant="body2">
            Data trimiterii: {params.row.created} <br />
            Prin extensie: {params.row.from_extension === true
              ? "DA"
              : "NU"}{" "}
            <br />
            Prin import: {params.row.from_import === true ? "DA" : "NU"}{" "}
          </Typography>
        );
      },
    },
  ];

  return (
    <Box>
      {rows.size === 0 ? (
        <Typography align="center">Nimic de afișat.</Typography>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          autoHeight
          rowHeight={175}
          localeText={localeText}
          pageSize={25}
          rowsPerPageOptions={[10, 25, 50, 100, 500]}
          style={{ minWidth: "1000px", overflowX: "auto", overflowY: "hidden" }}
        />
      )}
    </Box>
  );
};

export default function SolutiiCont() {
  const classes = useStyles();

  const { API, rootState, checkSession } = useContext(RootContext);

  const defaultState = {
    data: {
      accepted: [],
      awaiting: [],
      rejected: [],
    },
    stats: {
      accepted: 0,
      awaiting: 0,
      rejected: 0,
    },
    checked: false,
  };

  const [state, setState] = React.useState(defaultState);
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setTab(index);
  };

  useEffect(() => {
    async function getData() {
      await API("endpoint/page/cont-solutii.php").then((res) => {
        if (res.success) {
          setState({
            ...state,
            data: res.solutions,
            stats: res.stats,
            checked: true,
          });
          tabs[0].count = res.stats.accepted;
          tabs[1].count = res.stats.rejected;
          tabs[2].count = res.stats.awaiting;
        }
      });
    }

    getData();
  }, []);

  return (
    <>
      {rootState.authStatusChecked && rootState.isLoggedIn ? (
        <>
          <MetaTags>
            <title>Soluțiile tale | SOLINFO.ro</title>
          </MetaTags>
          <Container maxWidth="md">
            <Grid container>
              <Grid item xs={12} className={classes.header}>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={12} md={12}>
                    <Typography variant="h5" component="h1">
                      Soluțiile tale
                      <Chip
                        color="secondary"
                        size="small"
                        label="BETA"
                        style={{ marginLeft: "0.5rem" }}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1" component="p">
                      Mai jos găsești o listă cu toate soluțiile trimise de
                      către tine. Această pagină este încă în faza de testare,
                      așa că e posibil să apară erori.
                    </Typography>
                    <Typography variant="body1" component="p">
                      Dacă dorești să ne semnalizezi un bug ori dacă dorești să
                      ștergi una sau mai multe soluții, te rugăm să ne
                      contactezi.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className="cool-sha">
                      <Box p={state.checked ? 0 : 2}>
                        <Grid container spacing={0} alignItems="flex-end">
                          <Grid item xs={12}>
                            {!state.checked ? (
                              <Typography align="center">
                                Se încarcă datele...
                              </Typography>
                            ) : (
                              <>
                                <Tabs
                                  value={tab}
                                  onChange={handleChange}
                                  indicatorColor="primary"
                                  textColor="primary"
                                  variant="fullWidth"
                                >
                                  {tabs.map((tab, index) => {
                                    return (
                                      <Tab
                                        key={index}
                                        label={
                                          <>
                                            <Typography>
                                              {tab.title}
                                              <Chip
                                                color="primary"
                                                size="small"
                                                label={tab.count}
                                                style={{ marginLeft: "0.5rem" }}
                                              />
                                            </Typography>
                                          </>
                                        }
                                        {...a11yProps(index)}
                                      />
                                    );
                                  })}
                                </Tabs>
                                {tabs.map((tabData, index) => {
                                  return (
                                    <TabPanel value={tab} index={index}>
                                      <DelayedRenderer delay={300}>
                                        {index === 0 && (
                                          <Accepted
                                            data={state.data.accepted}
                                          />
                                        )}
                                        {index === 1 && (
                                          <Rejected
                                            data={state.data.rejected}
                                          />
                                        )}
                                        {index === 2 && (
                                          <Awaiting
                                            data={state.data.awaiting}
                                          />
                                        )}
                                      </DelayedRenderer>
                                    </TabPanel>
                                  );
                                })}
                              </>
                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </>
      ) : (
        <Cont />
      )}
    </>
  );
}
