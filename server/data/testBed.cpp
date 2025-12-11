int f() {
  for (/*initialization*/; /*conditional*/;
       /*operation to execute at end of each loop*/) {
    /*code to execute*/
  }
  while (/*conditional*/) {
    /*code to execute*/
  }
  if (/*conditional*/) {
    /*code to execute*/
  } else if (/*conditional*/) {
    /*code to execute*/
  } else {
    /*code to execute*/
  }
  do {

  } while (/*conditional*/);
  switch (/*expression*/) {
  case /*value*/:
    /*code to execute*/
    break;
  case /*value*/: { // must be a block to initialize variables
    /*code to execute*/
    break;
  }
  default:
    /*code to execute*/
    break;
  }
  try {
    /*code to execute*/
  } catch (/*exception*/) {
    /*code to execute*/
  }
  returnType functionName(/*parameters*/) { /*code to execute*/ }
  class ClassName {
    /*attributes and methods*/
  } struct StructName {
    /*attributes and methods*/
  } union UnionName {
    /*data members*/
  } enum EnumName {
    /*enum values*/
  } type arrayName[/*size*/] = {
    /*values*/
  }

#include <library> #include "file"
