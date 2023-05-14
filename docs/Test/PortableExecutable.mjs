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


IMAGE_FILE_MACHINE_UNKNOWN  0x0 "The content of this field is assumed to be applicable to any machine type"
IMAGE_FILE_MACHINE_ALPHA  0x184 "Alpha AXP, 32-bit address space"
IMAGE_FILE_MACHINE_ALPHA64  0x284 "Alpha 64, 64-bit address space"
IMAGE_FILE_MACHINE_AM33 0x1d3 "Matsushita AM33"
IMAGE_FILE_MACHINE_AMD64  0x8664  "x64"
IMAGE_FILE_MACHINE_ARM  0x1c0 "ARM little endian"
IMAGE_FILE_MACHINE_ARM64  0xaa64  "ARM64 little endian"
IMAGE_FILE_MACHINE_ARMNT  0x1c4 "ARM Thumb-2 little endian"
IMAGE_FILE_MACHINE_AXP64  0x284 "AXP 64 (Same as Alpha 64)"
IMAGE_FILE_MACHINE_EBC  0xebc "EFI byte code"
IMAGE_FILE_MACHINE_I386 0x14c "Intel 386 or later processors and compatible processors"
IMAGE_FILE_MACHINE_IA64 0x200 "Intel Itanium processor family"
IMAGE_FILE_MACHINE_LOONGARCH32  0x6232  "LoongArch 32-bit processor family"
IMAGE_FILE_MACHINE_LOONGARCH64  0x6264  "LoongArch 64-bit processor family"
IMAGE_FILE_MACHINE_M32R 0x9041  "Mitsubishi M32R little endian"
IMAGE_FILE_MACHINE_MIPS16 0x266 "MIPS16"
IMAGE_FILE_MACHINE_MIPSFPU  0x366 "MIPS with FPU"
IMAGE_FILE_MACHINE_MIPSFPU16  0x466 "MIPS16 with FPU"
IMAGE_FILE_MACHINE_POWERPC  0x1f0 "Power PC little endian"
IMAGE_FILE_MACHINE_POWERPCFP  0x1f1 "Power PC with floating point support"
IMAGE_FILE_MACHINE_R4000  0x166 "MIPS little endian"
IMAGE_FILE_MACHINE_RISCV32  0x5032  "RISC-V 32-bit address space"
IMAGE_FILE_MACHINE_RISCV64  0x5064  "RISC-V 64-bit address space"
IMAGE_FILE_MACHINE_RISCV128 0x5128  "RISC-V 128-bit address space"
IMAGE_FILE_MACHINE_SH3  0x1a2 "Hitachi SH3"
IMAGE_FILE_MACHINE_SH3DSP 0x1a3 "Hitachi SH3 DSP"
IMAGE_FILE_MACHINE_SH4  0x1a6 "Hitachi SH4"
IMAGE_FILE_MACHINE_SH5  0x1a8 "Hitachi SH5"
IMAGE_FILE_MACHINE_THUMB  0x1c2 "Thumb"
IMAGE_FILE_MACHINE_WCEMIPSV2  0x169 "MIPS little-endian WCE v2"

IMAGE_FILE_RELOCS_STRIPPED  0x0001  "Image only, Windows CE, and Microsoft Windows NT and later. This indicates that the file does not contain base relocations and must therefore be loaded at its preferred base address. If the base address is not available, the loader reports an error. The default behavior of the linker is to strip base relocations from executable (EXE) files."
IMAGE_FILE_EXECUTABLE_IMAGE 0x0002  "Image only. This indicates that the image file is valid and can be run. If this flag is not set, it indicates a linker error."
IMAGE_FILE_LINE_NUMS_STRIPPED 0x0004  "COFF line numbers have been removed. This flag is deprecated and should be zero."
IMAGE_FILE_LOCAL_SYMS_STRIPPED  0x0008  "COFF symbol table entries for local symbols have been removed. This flag is deprecated and should be zero."
IMAGE_FILE_AGGRESSIVE_WS_TRIM 0x0010  "Obsolete. Aggressively trim working set. This flag is deprecated for Windows 2000 and later and must be zero."
IMAGE_FILE_LARGE_ADDRESS_AWARE  0x0020  "Application can handle > 2-GB addresses."
  0x0040  "This flag is reserved for future use."
IMAGE_FILE_BYTES_REVERSED_LO  0x0080  "Little endian: the least significant bit (LSB) precedes the most significant bit (MSB) in memory. This flag is deprecated and should be zero."
IMAGE_FILE_32BIT_MACHINE  0x0100  "Machine is based on a 32-bit-word architecture."
IMAGE_FILE_DEBUG_STRIPPED 0x0200  "Debugging information is removed from the image file."
IMAGE_FILE_REMOVABLE_RUN_FROM_SWAP  0x0400  "If the image is on removable media, fully load it and copy it to the swap file."
IMAGE_FILE_NET_RUN_FROM_SWAP  0x0800  "If the image is on network media, fully load it and copy it to the swap file."
IMAGE_FILE_SYSTEM 0x1000  "The image file is a system file, not a user program."
IMAGE_FILE_DLL  0x2000  "The image file is a dynamic-link library (DLL). Such files are considered executable files for almost all purposes, although they cannot be directly run."
IMAGE_FILE_UP_SYSTEM_ONLY 0x4000  "The file should be run only on a uniprocessor machine."
IMAGE_FILE_BYTES_REVERSED_HI  0x8000  "Big endian: the MSB precedes the LSB in memory. This flag is deprecated and should be zero."

Offset 	Size 	Field 	Description
start: 0
length: 2
	Magic
	The unsigned integer that identifies the state of the image file. The most common number is 0x10B, which identifies it as a normal executable file. 0x107 identifies it as a ROM image, and 0x20B identifies it as a PE32+ executable.
start: 2
length: 1
	MajorLinkerVersion
	The linker major version number.
start: 3
length: 1
	MinorLinkerVersion
	The linker minor version number.
start: 4
length: 4
	SizeOfCode
	The size of the code (text) section, or the sum of all code sections if there are multiple sections.
start: 8
length: 4
	SizeOfInitializedData
	The size of the initialized data section, or the sum of all such sections if there are multiple data sections.
start: 12
length: 4
	SizeOfUninitializedData
	The size of the uninitialized data section (BSS), or the sum of all such sections if there are multiple BSS sections.
start: 16
length: 4
	AddressOfEntryPoint
	The address of the entry point relative to the image base when the executable file is loaded into memory. For program images, this is the starting address. For device drivers, this is the address of the initialization function. An entry point is optional for DLLs. When no entry point is present, this field must be zero.
start: 20
length: 4
	BaseOfCode
	The address that is relative to the image base of the beginning-of-code section when it is loaded into memory.

PE32 contains this additional field, which is absent in PE32+, following BaseOfCode.
Offset 	Size 	Field 	Description
start: 24
length: 4
	BaseOfData
	The address that is relative to the image base of the beginning-of-data section when it is loaded into memory.
