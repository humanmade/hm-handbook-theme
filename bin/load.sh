#!/usr/bin/env bash

# Switch to bin folder.

cd "bin" || return

# Get dependency installer package.
wget "$PIRATE_FLEET""install-dependencies.sh"

# Get wp tests installer.
wget "$PIRATE_FLEET""install-wp-tests.sh"

# Get deploy prepare.
wget "$PIRATE_FLEET""prepare-deploy.sh"

# Get deployer.
wget "$PIRATE_FLEET""deploy.sh"

# Get wraith script.
wget "$PIRATE_FLEET""wraith.sh"

# Switch back to folder.
cd ".."