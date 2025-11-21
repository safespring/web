let
  pkgs = import <nixpkgs> {};
in pkgs.mkShell {
  packages = with pkgs; [
    kubernetes
    kubelogin-oidc
  ];
}