PROTOC_SRC_DIR := ${PWD}/src/api/proto
PROTOC_OUT_DIR := ${PWD}/src/api/

PROTOC_SRC := $(shell ls -R ${PROTOC_SRC_DIR}/* | grep -E ".*\.proto")

PHONY: .protoc
protoc:
	protoc -I=${PROTOC_SRC_DIR} ${PROTOC_SRC} \
	--js_out=import_style=commonjs:src/api \
	--grpc-web_out=import_style=commonjs,mode=grpcwebtext:${PROTOC_OUT_DIR}
