import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

import styles from '../styles/styles';
import Router from '../lib/Router';

// Taken from Material UI DrawerUndockedExample at
// http://www.material-ui.com/#/components/drawer
class SideMenu extends React.Component {
  handleClick(itemProps) {
    // Menu item callback
    itemProps.handleClick();
    // Callback for parent
    this.props.handleClose(itemProps);
  }

  render() {
    return (
      <div style={{textAlign: 'left'}}>
        <Drawer
          docked={false}
          width={200}
          open={this.props.open}
          onRequestChange={this.props.onRequestChange}
        >
          {this.props.items.map((item) => {
            let itemProps;
            if (item.route) {
              const route = item.route;
              itemProps = {
                key: route.path,
                title: route.title,
                handleClick: () => {
                  Router.goToPath(route.path);
                },
              };
            }
            else {
              itemProps = item;
            }
            return (
              <MenuItem
                style={
                  _.defaults(
                    this.props.currentItemKey === itemProps.key ? styles.selectedMenuItem : {}
                  )
                }
                key={itemProps.key}
                onTouchTap={() => this.handleClick(itemProps)}
              >
                {itemProps.title}
              </MenuItem>
            );
          })}
        </Drawer>
      </div>
    );
  }
}

/*
 * These are the props allowed to be passed to this component.
 */
SideMenu.propTypes = {
  open: React.PropTypes.bool.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  currentItemKey: React.PropTypes.string,
  handleClose: React.PropTypes.func,
  onRequestChange: React.PropTypes.func,
};

export default SideMenu;
