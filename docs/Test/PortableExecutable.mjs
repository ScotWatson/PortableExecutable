/*
(c) 2023 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import * as ErrorLog from "https://scotwatson.github.io/Debug/Test/ErrorLog.mjs";
import * as Types from "https://scotwatson.github.io/Debug/Test/Types.mjs";
import * as Memory from "https://scotwatson.github.io/Memory/Test/Memory.mjs";

class COFFFileHeader {
  #view;
  constructor(args) {
    this.#view = args;
  }
  get viewMachine() {
    return this.#view.createSlice({
      start: 0,
      end: 2,
      byteLength: 2,
    });
  }
  get viewNumberOfSections() {
    return this.#view.createSlice({
      start: 2,
      end: 4,
      byteLength: 2,
    });
  }
  get viewTimeDateStamp() {
    return this.#view.createSlice({
      start: 4,
      end: 8,
      byteLength: 4,
    });
  }
  get viewPointerToSymbolTable() {
    return this.#view.createSlice({
      start: 8,
      end: 12,
      byteLength: 4,
    });
  }
  get viewNumberOfSymbols() {
    return this.#view.createSlice({
      start: 12,
      end: 16,
      byteLength: 4,
    });
  }
  get viewSizeOfOptionalHeader() {
    return this.#view.createSlice({
      start: 16,
      end: 18,
      byteLength: 2,
    });
  }
  get viewCharacteristics() {
    return this.#view.createSlice({
      start: 18,
      end: 20,
      byteLength: 2,
    });
  }
};


const IMAGE_FILE_MACHINE = (function () {
  let ret = new Map();
  ret.add("UNKNOWN",     0x0000); // The content of this field is assumed to be applicable to any machine type
  ret.add("ALPHA",       0x0184); // Alpha AXP, 32-bit address space
  ret.add("ALPHA64",     0x0284); // Alpha 64, 64-bit address space
  ret.add("AM33",        0x01D3); // Matsushita AM33
  ret.add("AMD64",       0x8664); // x64
  ret.add("ARM",         0x01C0); // ARM little endian
  ret.add("ARM64",       0xAA64); // ARM64 little endian
  ret.add("ARMNT",       0x01C4); // ARM Thumb-2 little endian
  ret.add("AXP64",       0x0284); // AXP 64 (Same as Alpha 64)
  ret.add("EBC",         0x0EBC); // EFI byte code
  ret.add("I386",        0x014C); // Intel 386 or later processors and compatible processors
  ret.add("IA64",        0x0200); // Intel Itanium processor family
  ret.add("LOONGARCH32", 0x6232); // LoongArch 32-bit processor family
  ret.add("LOONGARCH64", 0x6264); // LoongArch 64-bit processor family
  ret.add("M32R",        0x9041); // Mitsubishi M32R little endian
  ret.add("MIPS16",      0x0266); // MIPS16
  ret.add("MIPSFPU",     0x0366); // MIPS with FPU
  ret.add("MIPSFPU16",   0x0466); // MIPS16 with FPU
  ret.add("POWERPC",     0x01F0); // Power PC little endian
  ret.add("POWERPCFP",   0x01F1); // Power PC with floating point support
  ret.add("R4000",       0x0166); // MIPS little endian
  ret.add("RISCV32",     0x5032); // RISC-V 32-bit address space
  ret.add("RISCV64",     0x5064); // RISC-V 64-bit address space
  ret.add("RISCV128",    0x5128); // RISC-V 128-bit address space
  ret.add("SH3",         0x01A2); // Hitachi SH3
  ret.add("SH3DSP",      0x01A3); // Hitachi SH3 DSP
  ret.add("SH4",         0x01A6); // Hitachi SH4
  ret.add("SH5",         0x01A8); // Hitachi SH5
  ret.add("THUMB",       0x01C2); // Thumb
  ret.add("WCEMIPSV2",   0x0169); // MIPS little-endian WCE v2
  return ret;
})();

const IMAGE_FILE_MACHINE_INV = (function () {
  let ret = new Map();
  ret.add(0x0000, "UNKNOWN"    ); // The content of this field is assumed to be applicable to any machine type
  ret.add(0x0184, "ALPHA"      ); // Alpha AXP, 32-bit address space
  ret.add(0x0284, "ALPHA64"    ); // Alpha 64, 64-bit address space
  ret.add(0x01D3, "AM33"       ); // Matsushita AM33
  ret.add(0x8664, "AMD64"      ); // x64
  ret.add(0x01C0, "ARM"        ); // ARM little endian
  ret.add(0xAA64, "ARM64"      ); // ARM64 little endian
  ret.add(0x01C4, "ARMNT"      ); // ARM Thumb-2 little endian
  ret.add(0x0284, "AXP64"      ); // AXP 64 (Same as Alpha 64)
  ret.add(0x0EBC, "EBC"        ); // EFI byte code
  ret.add(0x014C, "I386"       ); // Intel 386 or later processors and compatible processors
  ret.add(0x0200, "IA64"       ); // Intel Itanium processor family
  ret.add(0x6232, "LOONGARCH32"); // LoongArch 32-bit processor family
  ret.add(0x6264, "LOONGARCH64"); // LoongArch 64-bit processor family
  ret.add(0x9041, "M32R"       ); // Mitsubishi M32R little endian
  ret.add(0x0266, "MIPS16"     ); // MIPS16
  ret.add(0x0366, "MIPSFPU"    ); // MIPS with FPU
  ret.add(0x0466, "MIPSFPU16"  ); // MIPS16 with FPU
  ret.add(0x01F0, "POWERPC"    ); // Power PC little endian
  ret.add(0x01F1, "POWERPCFP"  ); // Power PC with floating point support
  ret.add(0x0166, "R4000"      ); // MIPS little endian
  ret.add(0x5032, "RISCV32"    ); // RISC-V 32-bit address space
  ret.add(0x5064, "RISCV64"    ); // RISC-V 64-bit address space
  ret.add(0x5128, "RISCV128"   ); // RISC-V 128-bit address space
  ret.add(0x01A2, "SH3"        ); // Hitachi SH3
  ret.add(0x01A3, "SH3DSP"     ); // Hitachi SH3 DSP
  ret.add(0x01A6, "SH4"        ); // Hitachi SH4
  ret.add(0x01A8, "SH5"        ); // Hitachi SH5
  ret.add(0x01C2, "THUMB"      ); // Thumb
  ret.add(0x0169, "WCEMIPSV2"  ); // MIPS little-endian WCE v2
  return ret;
})();

IMAGE_FILE
"RELOCS_STRIPPED"  0x0001  "Image only, Windows CE, and Microsoft Windows NT and later. This indicates that the file does not contain base relocations and must therefore be loaded at its preferred base address. If the base address is not available, the loader reports an error. The default behavior of the linker is to strip base relocations from executable (EXE) files."
"EXECUTABLE_IMAGE" 0x0002  "Image only. This indicates that the image file is valid and can be run. If this flag is not set, it indicates a linker error."
"LINE_NUMS_STRIPPED" 0x0004  "COFF line numbers have been removed. This flag is deprecated and should be zero."
"LOCAL_SYMS_STRIPPED"  0x0008  "COFF symbol table entries for local symbols have been removed. This flag is deprecated and should be zero."
"AGGRESSIVE_WS_TRIM" 0x0010  "Obsolete. Aggressively trim working set. This flag is deprecated for Windows 2000 and later and must be zero."
"LARGE_ADDRESS_AWARE"  0x0020  "Application can handle > 2-GB addresses."
  0x0040  "This flag is reserved for future use."
"BYTES_REVERSED_LO"  0x0080  "Little endian: the least significant bit (LSB) precedes the most significant bit (MSB) in memory. This flag is deprecated and should be zero."
"32BIT_MACHINE"  0x0100  "Machine is based on a 32-bit-word architecture."
"DEBUG_STRIPPED" 0x0200  "Debugging information is removed from the image file."
"REMOVABLE_RUN_FROM_SWAP"  0x0400  "If the image is on removable media, fully load it and copy it to the swap file."
"NET_RUN_FROM_SWAP"  0x0800  "If the image is on network media, fully load it and copy it to the swap file."
"SYSTEM" 0x1000  "The image file is a system file, not a user program."
"DLL"  0x2000  "The image file is a dynamic-link library (DLL). Such files are considered executable files for almost all purposes, although they cannot be directly run."
"UP_SYSTEM_ONLY" 0x4000  "The file should be run only on a uniprocessor machine."
"BYTES_REVERSED_HI"  0x8000  "Big endian: the MSB precedes the LSB in memory. This flag is deprecated and should be zero."

class PE32OptionalHeader {
  #view;
  constructor(args) {
    this.#view = args;
  }
  // The unsigned integer that identifies the state of the image file. The most common number is 0x10B, which identifies it as a normal executable file. 0x107 identifies it as a ROM image, and 0x20B identifies it as a PE32+ executable.
  get viewMagic() {
    return this.#view.createSlice({
      start: 0,
      end: 2,
      byteLength: 2,
    });
  }
  // The linker major version number.
  get viewMajorLinkerVersion() {
    return this.#view.createSlice({
      start: 2,
      end: 3,
      byteLength: 1,
    });
  }
  // The linker minor version number.
  get viewMinorLinkerVersion() {
    return this.#view.createSlice({
      start: 3,
      end: 4,
      byteLength: 1,
    });
  }
  // The size of the code (text) section, or the sum of all code sections if there are multiple sections.
  get viewSizeOfCode() {
    return this.#view.createSlice({
      start: 4,
      end: 8,
      byteLength: 4,
    });
  }
  // The size of the initialized data section, or the sum of all such sections if there are multiple data sections.
  get viewSizeOfInitializedData() {
    return this.#view.createSlice({
      start: 8,
      end: 12,
      byteLength: 4,
    });
  }
  // The size of the uninitialized data section (BSS), or the sum of all such sections if there are multiple BSS sections.
  get viewSizeOfUninitializedData() {
    return this.#view.createSlice({
      start: 12,
      end: 16,
      byteLength: 4,
    });
  }
  // The address of the entry point relative to the image base when the executable file is loaded into memory. For program images, this is the starting address. For device drivers, this is the address of the initialization function. An entry point is optional for DLLs. When no entry point is present, this field must be zero.
  get viewAddressOfEntryPoint() {
    return this.#view.createSlice({
      start: 16,
      end: 20,
      byteLength: 4,
    });
  }
  // The address that is relative to the image base of the beginning-of-code section when it is loaded into memory.
  get viewBaseOfCode() {
    return this.#view.createSlice({
      start: 20,
      end: 24,
      byteLength: 4,
    });
  }
};

class PE32PlusOptionalHeader {
  #view;
  constructor(args) {
    this.#view = args;
  }
  // The unsigned integer that identifies the state of the image file. The most common number is 0x10B, which identifies it as a normal executable file. 0x107 identifies it as a ROM image, and 0x20B identifies it as a PE32+ executable.
  get viewMagic() {
    return this.#view.createSlice({
      start: 0,
      end: 2,
      byteLength: 2,
    });
  }
  // The linker major version number.
  get viewMajorLinkerVersion() {
    return this.#view.createSlice({
      start: 2,
      end: 3,
      byteLength: 1,
    });
  }
  // The linker minor version number.
  get viewMinorLinkerVersion() {
    return this.#view.createSlice({
      start: 3,
      end: 4,
      byteLength: 1,
    });
  }
  // The size of the code (text) section, or the sum of all code sections if there are multiple sections.
  get viewSizeOfCode() {
    return this.#view.createSlice({
      start: 4,
      end: 8,
      byteLength: 4,
    });
  }
  // The size of the initialized data section, or the sum of all such sections if there are multiple data sections.
  get viewSizeOfInitializedData() {
    return this.#view.createSlice({
      start: 8,
      end: 12,
      byteLength: 4,
    });
  }
  // The size of the uninitialized data section (BSS), or the sum of all such sections if there are multiple BSS sections.
  get viewSizeOfUninitializedData() {
    return this.#view.createSlice({
      start: 12,
      end: 16,
      byteLength: 4,
    });
  }
  // The address of the entry point relative to the image base when the executable file is loaded into memory. For program images, this is the starting address. For device drivers, this is the address of the initialization function. An entry point is optional for DLLs. When no entry point is present, this field must be zero.
  get viewAddressOfEntryPoint() {
    return this.#view.createSlice({
      start: 16,
      end: 20,
      byteLength: 4,
    });
  }
  // The address that is relative to the image base of the beginning-of-code section when it is loaded into memory.
  get viewBaseOfCode() {
    return this.#view.createSlice({
      start: 20,
      end: 24,
      byteLength: 4,
    });
  }
  // The address that is relative to the image base of the beginning-of-data section when it is loaded into memory.
  get viewBaseOfData() {
    return this.#view.createSlice({
      start: 20,
      end: 24,
      byteLength: 4,
    });
  }
};
