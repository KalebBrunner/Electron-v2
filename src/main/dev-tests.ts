
import {Dirent} from "../objects/Dirent"

export function runDevTests(): Dirent {
  // put any functions you want to manually sanity check here
  console.log('[dev-tests] platform:', process.platform)


  let myDirent: Dirent = new Dirent(
    "file1", 
  )


  console.log('[dev-tests] filetest:', myDirent)

  return myDirent;
}