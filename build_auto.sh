#!/usr/bin/env zsh
./mach build && ./mach package && ./mach build langpack-ja && AB_CD=ja ./mach package && ./mach build installers-ja