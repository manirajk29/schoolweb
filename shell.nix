{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs.python310Packages; [
    flask
    PyPDF2
    requests
    werkzeug
  ];
}



