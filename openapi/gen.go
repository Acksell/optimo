//go:build tools
// +build tools

package main

import (
	// Red, but it seems to work. According to: https://github.com/oapi-codegen/oapi-codegen/tree/main?tab=readme-ov-file#prior-to-go-124
	// Only for go versions before 1.24. Remove once migrated to go 1.24
	_ "github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen"
)

//go:generate go run github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen --config=cfg.yaml apispec.yaml
