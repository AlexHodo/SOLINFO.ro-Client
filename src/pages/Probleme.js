import React, { useContext } from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MuiAccordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { RootContext } from "./../contexts/Context";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import LaunchIcon from "@material-ui/icons/Launch";
import Box from "@material-ui/core/Box";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import CustomRating from "./../components/CustomRating";
import Alert from "@material-ui/lab/Alert";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import Sidebar from "./../components/Sidebar";
import MetaTags from "react-meta-tags";
import NotFound from "./../components/NotFound";
import AdSense from "react-adsense";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SortTwoToneIcon from "@material-ui/icons/SortTwoTone";
import { DataGrid } from '@material-ui/data-grid';
import { useHistory, useLocation } from "react-router-dom";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import { DelayedRenderer } from "react-delayed-renderer"

const useStyles = makeStyles((theme) => ({
  header: {
    margin: theme.spacing(3, 0, 0, 0),
    textAlign: "left",
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  shownOnXs: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  shownOnSm: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  dataGridRoot: {
    border: "none"
  },
  dataGridCell: {
    
  },
  row: {
    "&.g": {
      background: fade(theme.palette.success.main, 0.33)
    },
    "&.r": {
      background: fade(theme.palette.error.main, 0.33)
    }
  }
}));

export default function Probleme() {

  let history = useHistory();

  const { API } = useContext(RootContext);

  const defaultState = {
    data_loaded: false,
    data_loading: false,
    problems: [],
    success: null,
    errorMsg: null,
    responseCode: null,
  };

  const [state, setState] = React.useState(defaultState);

  const classes = useStyles();

  const rows = state.problems;

  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      flex: 0.75, 
    },
    { 
      field: 'name', 
      headerName: 'Nume', 
      flex: 1, 
      renderCell: (params) => {
        return <b><Link to={`/problema/${params.row.name}`}>{params.row.name}</Link></b>
      },
    },
    { 
      field: 'a_c', 
      headerName: 'Accesări', 
      flex: 1, 
      renderCell: (params) => {
        return <>{params.row.a_c} {params.row.a_c === 1? "acc." : "acc."}</>
      },
    },
    { 
      field: 's_c', 
      headerName: 'Soluții', 
      flex: 1, 
      renderCell: (params) => {
        return <>{params.row.s_c} {params.row.s_c === 1? "sol." : "sol."}</>
      },
    },
    { 
      field: 'v_c', 
      headerName: 'Viz. sol.', 
      flex: 1, 
      renderCell: (params) => {
        return <>{params.row.v_c} {params.row.v_c === 1? "viz. sol." : "viz. sol."}</>
      },
    },
    {
      field: 'action',
      headerName: 'Acțiuni',
      flex: 1,
      renderCell: (params) => {
        return <Link to={`/problema/${params.row.name}`} style={{width: "100%"}}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disableElevation
            style={{width: "100%"}}
          >
            Deschide
          </Button>
        </Link>
      },
    }
  ];

  const onLoad = async (event) => {
    setState({
      ...state,
      data_loading: true,
    });

    const logonRequest = await API("endpoint/page/probleme.php");

    setState({
      ...state,
      data_loaded: true,
      data_loading: false,
      success: logonRequest.success,
      errorMsg: logonRequest.errorMsg,
      problems: logonRequest.problems,
      responseCode: logonRequest.responseCode,
    });
  };

  if (!state.data_loading && !state.data_loaded) {
    onLoad();
  }

  let location = useLocation()

  return (
    <CSSTransition
      key={location.key}
      classNames="_anim--1"
      timeout={300}
      in={state.data_loaded}
    >
      <Container maxWidth="md">
        <Grid container>
          {!state.data_loaded && (
            <Grid item xs={12} className={classes.placeholder} style={{minHeight: "100vh"}}>
              <Box m={2} mt={5}>
                <center>
                  <CircularProgress />
                </center>
              </Box>
            </Grid>
          )}
          {state.data_loaded && state.success && (
            <>
              <MetaTags>
                <title>
                  Lista problemelor de pe PbInfo cu soluții | SOLINFO.ro
                </title>
              </MetaTags>
              <Grid item xs={12} className={classes.header}>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h1">
                      Probleme
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12} sm={8} md={9}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="h6" component="h2">
                      Lista problemelor disponibile
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" component="p">
                      În tabelul de mai jos găsești toate probleme disponibile. Problemele colorate în verde au cel puțin o soluție, iar cele colorate cu roșu nu au încă niciuna.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className="cool-sha" style={{width: "100%", overflow: "scroll"}}>
                      <div style={{minWidth: "600px"}}>
                        <DelayedRenderer delay={300}>
                        <DataGrid 
                          style = {{width: "100%"}}
                          disableSelectionOnClick
                          getRowClassName={(params) =>
                            `${classes.row} ${params.row.s_c > 0? "g" : "r"}`
                          }
                          columns={columns} 
                          rows={rows} 
                          isRowSelectable={false} 
                          autoHeight
                          classes={{
                            root: classes.dataGridRoot,
                            cell: classes.dataGridCell
                          }}
                          rowHeight={40}
                          pageSize={50}
                          rowsPerPageOptions={[50]}
                          localeText={{
                            noResultsOverlayLabel: 'Niciun rezultat.',
                            toolbarColumns: 'Coloane',
                            toolbarFilters: 'Filters',
                            toolbarFiltersLabel: 'Vezi filtrele',
                            toolbarFiltersTooltipHide: 'Ascunde filtrele',
                            toolbarFiltersTooltipShow: 'Vezi filtrele',
                            toolbarFiltersTooltipActive: (count) =>
                              count !== 1 ? `${count} filtre active` : `${count} filtru activ`,
                            columnsPanelTextFieldPlaceholder: 'Column title',
                            columnsPanelDragIconLabel: 'Reorder column',
                            columnsPanelShowAllButton: 'Arată tot',
                            columnsPanelHideAllButton: 'Ascunde tot',
                            filterPanelAddFilter: 'Adaugă foltru',
                            filterPanelDeleteIconLabel: 'Șterge',
                            filterPanelOperators: 'Operatori',
                            filterPanelOperatorAnd: 'Și',
                            filterPanelOperatorOr: 'Sau',
                            filterPanelColumns: 'Coloană',
                            filterPanelInputLabel: 'Valoare',
                            filterPanelInputPlaceholder: 'Valoare',
                            filterOperatorContains: 'conține',
                            filterOperatorEquals: 'este egal cu',
                            filterOperatorStartsWith: 'începe cu',
                            filterOperatorEndsWith: 'se termină cu',
                            filterOperatorIs: 'este',
                            filterOperatorNot: 'nu este',
                            filterOperatorAfter: 'este după',
                            filterOperatorOnOrAfter: 'is on or after',
                            filterOperatorBefore: 'este înainte',
                            filterOperatorOnOrBefore: 'is on or before',
                            filterValueAny: 'oricare',
                            filterValueTrue: 'adevărat',
                            filterValueFalse: 'fals',
                            columnMenuLabel: 'Menu',
                            columnMenuShowColumns: 'Arată coloane',
                            columnMenuFilter: 'Filtru',
                            columnMenuHideColumn: 'Ascunde',
                            columnMenuUnsort: 'Anulează sortarea',
                            columnMenuSortAsc: 'Sortează ASC',
                            columnMenuSortDesc: 'Sortează DESC',
                            columnHeaderFiltersTooltipActive: (count) =>
                              count !== 1 ? `${count} filtre active` : `${count} filtru activ`,
                            columnHeaderFiltersLabel: 'Arată filtrele',
                            columnHeaderSortIconLabel: 'Sortează',
                            footerTotalRows: 'Linii:',
                            booleanCellTrueLabel: 'adevărat',
                            booleanCellFalseLabel: 'fals',
                            MuiTablePagination: {},
                            columnsPanelTextFieldLabel: 'Găsește coloană',
                            columnsPanelTextFieldPlaceholder: 'Titlu coloană',
                            columnsPanelShowAllButton: 'Arată tot',
                            columnsPanelHideAllButton: 'Ascunde tot',
                            footerTotalVisibleRows: (visibleCount, totalCount) =>
                              `${visibleCount.toLocaleString()} din ${totalCount.toLocaleString()}`,
                            MuiTablePagination: {
                              labelRowsPerPage: "Probleme pe pagină",
                              labelDisplayedRows: ({from, to, count}) => `${from}-${to} din ${count}`
                            }
                          }}
                        />
                        </DelayedRenderer>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box pt={3} className={classes.shownOnXs} />
                <Sidebar />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </CSSTransition>
  );
}
