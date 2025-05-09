/*
(c) 2023 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const mapImageSubsystem = new Map();
mapImageSubsystem.set(0, "UNKNOWN"); // An unknown subsystem
mapImageSubsystem.set(1, "NATIVE"); // Device drivers and native Windows processes
mapImageSubsystem.set(2, "WINDOWS_GUI"); // The Windows graphical user interface (GUI) subsystem
mapImageSubsystem.set(3, "WINDOWS_CUI"); // The Windows character subsystem
mapImageSubsystem.set(5, "OS2_CUI"); // The OS/2 character subsystem
mapImageSubsystem.set(7, "POSIX_CUI"); // The Posix character subsystem
mapImageSubsystem.set(8, "NATIVE_WINDOWS"); // Native Win9x driver
mapImageSubsystem.set(9, "WINDOWS_CE_GUI"); // Windows CE
mapImageSubsystem.set(10, "EFI_APPLICATION"); // An Extensible Firmware Interface (EFI) application
mapImageSubsystem.set(11, "EFI_BOOT_SERVICE_DRIVER"); // An EFI driver with boot services
mapImageSubsystem.set(12, "EFI_RUNTIME_DRIVER"); // An EFI driver with run-time services
mapImageSubsystem.set(13, "EFI_ROM"); // An EFI ROM image
mapImageSubsystem.set(14, "XBOX"); // XBOX
mapImageSubsystem.set(16, "WINDOWS_BOOT_APPLICATION"); // Windows boot application.

const mapImageDLLCharacteristics = new Map();
mapImageDLLCharacteristics.set(0x0020, "HIGH_ENTROPY_VA"); // Image can handle a high entropy 64-bit virtual address space.
mapImageDLLCharacteristics.set(0x0040, "DYNAMIC_BASE"); // DLL can be relocated at load time.
mapImageDLLCharacteristics.set(0x0080, "FORCE_INTEGRITY"); // Code Integrity checks are enforced.
mapImageDLLCharacteristics.set(0x0100, "NX_COMPAT"); // Image is NX compatible.
mapImageDLLCharacteristics.set(0x0200, "NO_ISOLATION"); // Isolation aware, but do not isolate the image.
mapImageDLLCharacteristics.set(0x0400, "NO_SEH"); // Does not use structured exception (SE) handling. No SE handler may be called in this image.
mapImageDLLCharacteristics.set(0x0800, "NO_BIND"); // Do not bind the image.
mapImageDLLCharacteristics.set(0x1000, "APPCONTAINER"); // Image must execute in an AppContainer.
mapImageDLLCharacteristics.set(0x2000, "WDM_DRIVER"); // A WDM driver.
mapImageDLLCharacteristics.set(0x4000, "GUARD_CF"); // Image supports Control Flow Guard.
mapImageDLLCharacteristics.set(0x8000, "TERMINAL_SERVER_AWARE"); // Terminal Server aware.

const mapImageSection = new Map();
mapImageSection.set(0x00000008, "TYPE_NO_PAD"); // The section should not be padded to the next boundary. This flag is obsolete and is replaced by IMAGE_SCN_ALIGN_1BYTES. This is valid only for object files.
mapImageSection.set(0x00000020, "CNT_CODE"); // The section contains executable code.
mapImageSection.set(0x00000040, "CNT_INITIALIZED_DATA"); // The section contains initialized data.
mapImageSection.set(0x00000080, "CNT_UNINITIALIZED_DATA"); // The section contains uninitialized data.
mapImageSection.set(0x00000200, "LNK_INFO"); // The section contains comments or other information. The .drectve section has this type. This is valid for object files only.
mapImageSection.set(0x00000800, "LNK_REMOVE"); // The section will not become part of the image. This is valid only for object files.
mapImageSection.set(0x00001000, "LNK_COMDAT"); // The section contains COMDAT data. For more information, see COMDAT Sections (Object Only). This is valid only for object files.
mapImageSection.set(0x00008000, "GPREL"); // The section contains data referenced through the global pointer (GP).
mapImageSection.set(0x00100000, "ALIGN_1BYTES"); // Align data on a 1-byte boundary. Valid only for object files.
mapImageSection.set(0x00200000, "ALIGN_2BYTES"); // Align data on a 2-byte boundary. Valid only for object files.
mapImageSection.set(0x00300000, "ALIGN_4BYTES"); // Align data on a 4-byte boundary. Valid only for object files.
mapImageSection.set(0x00400000, "ALIGN_8BYTES"); // Align data on an 8-byte boundary. Valid only for object files.
mapImageSection.set(0x00500000, "ALIGN_16BYTES"); // Align data on a 16-byte boundary. Valid only for object files.
mapImageSection.set(0x00600000, "ALIGN_32BYTES"); // Align data on a 32-byte boundary. Valid only for object files.
mapImageSection.set(0x00700000, "ALIGN_64BYTES"); // Align data on a 64-byte boundary. Valid only for object files.
mapImageSection.set(0x00800000, "ALIGN_128BYTES"); // Align data on a 128-byte boundary. Valid only for object files.
mapImageSection.set(0x00900000, "ALIGN_256BYTES"); // Align data on a 256-byte boundary. Valid only for object files.
mapImageSection.set(0x00A00000, "ALIGN_512BYTES"); // Align data on a 512-byte boundary. Valid only for object files.
mapImageSection.set(0x00B00000, "ALIGN_1024BYTES"); // Align data on a 1024-byte boundary. Valid only for object files.
mapImageSection.set(0x00C00000, "ALIGN_2048BYTES"); // Align data on a 2048-byte boundary. Valid only for object files.
mapImageSection.set(0x00D00000, "ALIGN_4096BYTES"); // Align data on a 4096-byte boundary. Valid only for object files.
mapImageSection.set(0x00E00000, "ALIGN_8192BYTES"); // Align data on an 8192-byte boundary. Valid only for object files.
mapImageSection.set(0x01000000, "LNK_NRELOC_OVFL"); // The section contains extended relocations.
mapImageSection.set(0x02000000, "MEM_DISCARDABLE"); // The section can be discarded as needed.
mapImageSection.set(0x04000000, "MEM_NOT_CACHED"); // The section cannot be cached.
mapImageSection.set(0x08000000, "MEM_NOT_PAGED"); // The section is not pageable.
mapImageSection.set(0x10000000, "MEM_SHARED"); // The section can be shared in memory.
mapImageSection.set(0x20000000, "MEM_EXECUTE"); // The section can be executed as code.
mapImageSection.set(0x40000000, "MEM_READ"); // The section can be read.
mapImageSection.set(0x80000000, "MEM_WRITE"); // The section can be written to.

function readExportTable() {
  
}
// The export table address and size. For more information see .edata Section (Image Only).

function readImportTable() {
  
}
// The import table address and size. For more information, see The .idata Section.

function readResourceTable() {
  
}
// The resource table address and size. For more information, see The .rsrc Section.

function readExceptionTable() {
  
}
// The exception table address and size. For more information, see The .pdata Section.

function readCertificateTable() {
  
}
// The attribute certificate table address and size. For more information, see The Attribute Certificate Table (Image Only).

function readBaseRelocationTable() {
  
}
// The base relocation table address and size. For more information, see The .reloc Section (Image Only).

function readDebug() {
  
}
// The debug data starting address and size. For more information, see The .debug Section.

function readArchitecture() {
  
}
// Reserved, must be 0

function readGlobalPtr() {
  
}
// The RVA of the value to be stored in the global pointer register. The size member of this structure must be set to zero.

function readTLSTable() {
  
}
// The thread local storage (TLS) table address and size. For more information, see The .tls Section.

function readLoadConfigTable() {
  
}
// The load configuration table address and size. For more information, see The Load Configuration Structure (Image Only).

function readBoundImport() {
  
}
// The bound import table address and size.

function readIAT() {
  
}
// The import address table address and size. For more information, see Import Address Table.

function readDelayImportDescriptor() {
  
}
// The delay import descriptor address and size. For more information, see Delay-Load Import Tables (Image Only).

function readCLRRuntimeHeader() {
  
}
// The CLR runtime header address and size. For more information, see The .cormeta Section (Object Only).

// Reserved, must be zero

/*
const mod = byte >> 6;
const reg = (byte >> 3) & 0x07;
const r_m = byte & 0x07;
async function wait_for_mod_reg_r_m() {
  const byte = getByte();
  const mod = byte >> 6;
  const reg = (byte >> 3) & 0x07;
  const r_m = byte & 0x07;
  let disp;
  switch (mod) {
    case 0:
      if (r_m === 6) {
        disp = getDisp16();
      } else {
        disp = 0;
      }
    case 1:
      disp = getDisp8();
    case 2:
      disp = getDisp16();
    case 3:
      disp = reg8() or reg16();
  }
}
switch (mod) {
  case 0:
    const op = APU_op(reg);
    return ();
  case 1:
  case 2:
  case 3:
}

function ea_of_r_m(x) {
  switch (x) {
    case 0:
      return "[BX+SI+" +  + "]";
    case 1:
      return "[BX+DI+" +  + "]";
    case 2:
      return "[BP+SI+" +  + "]";
    case 3:
      return "[BP+DI+" +  + "]";
    case 4:
      return "[SI+" +  + "]";
    case 5:
      return "[DI+" +  + "]";
    case 6:
      return "[BX+" +  + "]";
    case 7:
      return "[BP+" +  + "]";
  }
}
function APU_op(x) {
  switch (x) {
    case 0:
      return "ADD";
    case 1:
      return "OR";
    case 2:
      return "ADC";
    case 3:
      return "SBB";
    case 4:
      return "AND";
    case 5:
      return "SUB";
    case 6:
      return "XOR";
    case 7:
      return "CMP";
  }
}
function reg8(x) {
  switch (x) {
    case 0:
      return "AL";
    case 1:
      return "CL";
    case 2:
      return "DL";
    case 3:
      return "BL";
    case 4:
      return "AH";
    case 5:
      return "CH";
    case 6:
      return "DH";
    case 7:
      return "BH";
  }
}
function reg16(x) {
  switch (x) {
    case 0:
      return "AX";
    case 1:
      return "CX";
    case 2:
      return "DX";
    case 3:
      return "BX";
    case 4:
      return "SP";
    case 5:
      return "BP";
    case 6:
      return "SI";
    case 7:
      return "DI";
  }
}
function seg(x) {
  switch (x) {
    case 0:
      return "ES";
    case 1:
      return "CS";
    case 2:
      return "SS";
    case 3:
      return "DS";
  }
}
*/
// This function reads 0x40 bytes and returns the DOS header object
function readDOSHeader(input) {
  const ret = {};
  const fileCounter = input.getCounter();
  const magic_number = await input.readUint16LE();
  if (magic_number !== 0x5A4D) {
    throw new Error("magic_number must be 'MZ'");
  }
  ret.e_cblp = await input.readUint16LE();
  ret.e_cp = await input.readUint16LE();
  ret.e_crlc = await input.readUint16LE();
  ret.e_cparhdr = await input.readUint16LE();
  ret.e_minalloc = await input.readUint16LE();
  ret.e_maxalloc = await input.readUint16LE();
  ret.e_ss = await input.readUint16LE();
  ret.e_sp = await input.readUint16LE();
  ret.e_csum = await input.readUint16LE();
  ret.e_ip = await input.readUint16LE();
  ret.e_cs = await input.readUint16LE();
  ret.e_lfarlc = await input.readUint16LE();
  ret.e_ovno = await input.readUint16LE();
  await input.skipBytes(8);
  ret.e_oemid = await input.readUint16LE();
  ret.e_oeminfo = await input.readUint16LE();
  await input.skipBytes(20);
  ret.e_lfanew = await input.readUint32LE();
  ret.exe_offset = ret.e_cparhdr * 16;
  ret.exe_size = DOSHeader.e_cblp === 0 ? DOSHeader.e_cp * 512 : (DOSHeader.e_cp - 1) * 512 + DOSHeader.e_cblp;
  ret.reloc_offset = ret.e_lfarlc;
  ret.reloc_num = ret.e_crlc;
  return ret;
}
function readCOFFFileHeader(input) {
  const DOSHeader = readDOSHeader();
  input.skipBytes(DOSHeader.e_lfanew - 0x40);
  const signature = input.readUint32();
  if (signature !== 0x00004550) {
    throw new Error("bad signature");
  }
  ret.machine = await input.readUint16LE();
  ret.numSections = await input.readUint16LE();
  ret.timeDateStamp = await input.readUint32LE();
  ret.pointerToSymbolTable = await input.readUint32LE();
  ret.numSymbols = await input.readUint32LE();
  ret.sizeOfOptionalHeader = await input.readUint16LE();
  ret.characteristics = await input.readUint16LE();
  // start optional header
  ret.optionalMagicNumber = await input.readUint16LE();
  if (ret.optionalMagicNumber === 0x010B) {
    ret.majorLinkerVersion = await input.readUint8();
    ret.minorLinkerVersion = await input.readUint8();
    ret.sizeOfCode = await input.readUint32LE();
    ret.sizeOfInitializedData = await input.readUint32LE();
    ret.sizeOfUninitializedData = await input.readUint32LE();
    ret.addressOfEntryPoint = await input.readUint32LE();
    ret.baseOfCode = await input.readUint32LE();
    ret.baseOfData = await input.readUint32LE();
    ret.imageBase = await input.readUint32LE();
    ret.sectionAlignment = await input.readUint32LE();
    ret.fileAlignment = await input.readUint32LE();
    ret.majorOSVersion = await input.readUint16LE();
    ret.minorOSVersion = await input.readUint16LE();
    ret.majorImageVersion = await input.readUint16LE();
    ret.minorImageVersion = await input.readUint16LE();
    ret.majorSubsystemVersion = await input.readUint16LE();
    ret.minorSubsystemVersion = await input.readUint16LE();
    ret.Win32VersionValue = await input.readUint32LE();
    if (ret.Win32VersionValue !== 0) {
      throw new Error("Win32 Version Value must be 0.");
    }
    ret.sizeOfImage = await input.readUint32LE();
    ret.sizeOfHeaders = await input.readUint32LE();
    ret.checksum = await input.readUint32LE();
    ret.subsystem = await input.readUint16LE();
    ret.dllCharacteristics = await input.readUint16LE();
    ret.sizeOfStackReserve = await input.readUint32LE();
    ret.sizeOfStackCommit = await input.readUint32LE();
    ret.sizeOfHeapReserve = await input.readUint32LE();
    ret.sizeOfHeapCommit = await input.readUint32LE();
    ret.loaderFlags = await input.readUint32LE();
    ret.numberOfRvaAndSizes = await input.readUint32LE();
  } else if (ret.optionalMagicNumber === 0x020B) {
    ret.majorLinkerVersion = await input.readUint8();
    ret.minorLinkerVersion = await input.readUint8();
    ret.sizeOfCode = await input.readUint32LE();
    ret.sizeOfInitializedData = await input.readUint32LE();
    ret.sizeOfUninitializedData = await input.readUint32LE();
    ret.addressOfEntryPoint = await input.readUint32LE();
    ret.baseOfCode = await input.readUint32LE();
    ret.imageBase = await input.readUint64LE();
    ret.sectionAlignment = await input.readUint32LE();
    ret.fileAlignment = await input.readUint32LE();
    ret.majorOSVersion = await input.readUint16LE();
    ret.minorOSVersion = await input.readUint16LE();
    ret.majorImageVersion = await input.readUint16LE();
    ret.minorImageVersion = await input.readUint16LE();
    ret.majorSubsystemVersion = await input.readUint16LE();
    ret.minorSubsystemVersion = await input.readUint16LE();
    ret.Win32VersionValue = await input.readUint32LE();
    if (ret.Win32VersionValue !== 0) {
      throw new Error("Win32 Version Value must be 0.");
    }
    ret.sizeOfImage = await input.readUint32LE();
    ret.sizeOfHeaders = await input.readUint32LE();
    ret.checksum = await input.readUint32LE();
    ret.subsystem = await input.readUint16LE();
    ret.dllCharacteristics = await input.readUint16LE();
    ret.sizeOfStackReserve = await input.readUint64LE();
    ret.sizeOfStackCommit = await input.readUint64LE();
    ret.sizeOfHeapReserve = await input.readUint64LE();
    ret.sizeOfHeapCommit = await input.readUint64LE();
    ret.loaderFlags = await input.readUint32LE();
    ret.numberOfRvaAndSizes = await input.readUint32LE();
  } else {
    throw new Error("Bad Optional Header Magic Number");
  }
  if (ret.numberOfRvaAndSizes > 0x10) {
    throw new Error("Bad Optional Header Magic Number");
  }
  ret.dataDirectories = [];
  for (let i = 0; i < ret.numberOfRvaAndSizes; ++i) {
    const dataDirectory = {};
    dataDirectory.virtualAddress = await input.readUint32LE();
    dataDirectory.size = await input.readUint32LE();
    ret.dataDirectories.push(dataDirectory);
  }
  for (let i = ret.dataDirectories; i < 0x10; ++i) {
    ret.dataDirectories.push({
      virtualAddress: 0,
      size: 0,
    });
  }
  ret.sections = [];
  for (let i = 0; i < ret.numSections; ++i) {
    const section = {};
    section.name = await input.readBytes(8);
    section.virtualSize = await input.readUint32LE(); // size in memory
    section.virtualAddress = await input.readUint32LE(); // mem address relative to image base
    section.sizeOfRawData = await input.readUint32LE(); // size in file
    section.pointerToRawData = await input.readUint32LE(); // offset in file
    section.pointerToRelocations = await input.readUint32LE(); // offset in file
    section.pointerToLineNumbers = await input.readUint32LE(); // offset in file
    section.numRelocations = await input.readUint16LE();
    section.numLineNumbers = await input.readUint16LE();
    section.characteristics = await input.readUint32LE();
    ret.sections.push(section);
  }
  const sortedFileSections = Array.from(ret.sections);
  sortedFileSections.sort((a, b) => { return (a.pointerToRawData < b.pointerToRawData); });
  for (const section of sortedFileSections) {
    if (fileCounter.index > section.pointerToRawData) {
      throw new Error("Sections must not overlap");
    }
    await input.skipBytes(section.pointerToRawData - fileCounter.index);
    section.data = await input.readBytes(section.sizeOfRawData);
  }
  const sortedMemorySections = Array.from(ret.sections);
  sortedMemorySections.sort((a, b) => { return (a.virtualAddress < b.virtualAddress); })
  function getMemory(rva, size) {
    const section = sortedMemorySections[0];
    while (section.virtualAddress <= rva) {
      if (rva + size <= section.virtualAddress + section.virtualSize) {
        return new DataView(section.data.buffer, rva - section.virtualAddress, size);
      }
    }
    throw new Error("No section contains this RVA/size.");
  }
}

function HeapSink() {
  Object.defineProperty(this, "_dataview", {
    get: () => { return dataview; },
    set: undefined,
    configurable: false,
    enumerable: false,
  });
}
HeapSink.prototype = {
  sink() {
    return {
      getCounter() {
        const base = index;
        return {
          get index() {
            return (index - base);
          }
        };
      },
      writeBytes(heapSource) {
        const sourceDataview = heapSource._dataview;
        const sourceArray = new Uint8Array(sourceDataview.buffer, sourceDataview.byteOffset, sourceDataview.byteLength);
        const sinkDataview = this._dataview;
        const sinkArray = new Uint8Array(sinkDataview.buffer, sinkDataview.byteOffset, sinkDataview.byteLength);
        sinkArray.set(sourceArray, index);
      },
      writeUint8() {
        return dataview.setUint8(index);
      },
      writeSint8() {
        return dataview.setInt8(index);
      },
      writeUint16LE() {
        return dataview.setUint16(index, true);
      },
      writeUint16BE() {
        return dataview.setUint16(index, false);
      },
      writeSint16LE() {
        return dataview.setInt16(index, true);
      },
      writeSint16BE() {
        return dataview.setInt16(index, false);
      },
      writeUint32LE() {
        return dataview.setUint32(index, true);
      },
      writeUint32BE() {
        return dataview.setUint32(index, false);
      },
      writeSint32LE() {
        return dataview.setInt32(index, true);
      },
      writeSint32BE() {
        return dataview.setInt32(index, false);
      },
      writeUint64LE() {
        return dataview.setBigUint64(index, true);
      },
      writeUint64BE() {
        return dataview.setBigUint64(index, false);
      },
      writeSint64LE() {
        return dataview.setBigInt64(index, true);
      },
      writeSint64BE() {
        return dataview.setBigInt64(index, false);
      },
      writeFloat32LE() {
        return dataview.setFloat32(index, true);
      },
      writeFloat32BE() {
        return dataview.setFloat32(index, false);
      },
      writeFloat64LE() {
        return dataview.setFloat64(index, true);
      },
      writeFloat64BE() {
        return dataview.setFloat64(index, false);
      },
    };
  },
};
function HeapSource(dataview) {
  Object.defineProperty(this, "_dataview", {
    get: () => { return dataview; },
    set: undefined,
    configurable: false,
    enumerable: false,
  });
}
HeapSource.prototype = {
  stream() {
    let index = 0;
    return {
      getCounter() {
        const base = index;
        return {
          get index() {
            return (index - base);
          }
        };
      },
      readBytes(numBytes) {
        const dataview = this._dataview;
        return new MemoryBlock(new DataView(dataview.buffer, dataview.byteOffset + index, numBytes));
      },
      readUint8() {
        const ret = dataview.getUint8(index);
        index += 1;
        return ret;
      },
      readSint8() {
        const ret = dataview.getInt8(index);
        index += 1;
      },
      readUint16LE() {
        const ret = dataview.getUint16(index, true);
        index += 2;
      },
      readUint16BE() {
        const ret = dataview.getUint16(index, false);
        index += 2;
      },
      readSint16LE() {
        const ret = dataview.getInt16(index, true);
        index += 2;
      },
      readSint16BE() {
        const ret = dataview.getInt16(index, false);
        index += 2;
      },
      readUint32LE() {
        const ret = dataview.getUint32(index, true);
        index += 4;
      },
      readUint32BE() {
        const ret = dataview.getUint32(index, false);
        index += 4;
      },
      readSint32LE() {
        const ret = dataview.getInt32(index, true);
        index += 4;
      },
      readSint32BE() {
        return dataview.getInt32(index, false);
        index += 4;
      },
      readUint64LE() {
        return dataview.getBigUint64(index, true);
        index += 8;
      },
      readUint64BE() {
        return dataview.getBigUint64(index, false);
        index += 8;
      },
      readSint64LE() {
        return dataview.getBigInt64(index, true);
        index += 8;
      },
      readSint64BE() {
        return dataview.getBigInt64(index, false);
        index += 8;
      },
      readFloat32LE() {
        return dataview.getFloat32(index, true);
        index += 4;
      },
      readFloat32BE() {
        return dataview.getFloat32(index, false);
        index += 4;
      },
      readFloat64LE() {
        return dataview.getFloat64(index, true);
        index += 8;
      },
      readFloat64BE() {
        return dataview.getFloat64(index, false);
        index += 8;
      },
    };
  }
  slice(offset, length) {
    return new MemoryBlock(new DataView(dataview.buffer, index, numBytes));
  }
};

class COFFFileHeader {
  #view;
  constructor(args) {
    try {
      this.#view = args;
      if (args.byteLength !== 20) {
        throw "COFFFileHeader requires a byteLength of 20.";
      }
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "COFFFileHeader constructor",
        error: e,
      });
    }
  }
  get viewMachine() {
    try {
      return this.#view.createSlice({
        start: 0,
        end: 2,
        byteLength: 2,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.viewMachine",
        error: e,
      });
    }
  }
  set viewMachine() {
    throw "COFFFileHeader.viewMachine cannot be set.";
  }
  get machine() {
    try {
      let data = new Memory.Uint16LE(this.viewMachine);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.machine",
        error: e,
      });
    }
  }
  set machine(newVal) {
    try {
      let data = new Memory.Uint16LE(this.viewMachine);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.machine",
        error: e,
      });
    }
  }
  get viewNumberOfSections() {
    try {
      return this.#view.createSlice({
        start: 2,
        end: 4,
        byteLength: 2,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.viewNumberOfSections",
        error: e,
      });
    }
  }
  set viewNumberOfSections() {
    throw "COFFFileHeader.viewNumberOfSections cannot be set.";
  }
  get numberOfSections() {
    try {
      let data = new Memory.Uint16LE(this.viewNumberOfSections);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.numberOfSections",
        error: e,
      });
    }
  }
  set numberOfSections(newVal) {
    try {
      let data = new Memory.Uint16LE(this.viewNumberOfSections);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.numberOfSections",
        error: e,
      });
    }
  }
  get viewTimeDateStamp() {
    try {
      return this.#view.createSlice({
        start: 4,
        end: 8,
        byteLength: 4,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.viewTimeDateStamp",
        error: e,
      });
    }
  }
  set viewTimeDateStamp() {
    throw "COFFFileHeader.viewTimeDateStamp cannot be set.";
  }
  get timeDateStamp() {
    try {
      let int_data = new Memory.Sint32LE(this.viewTimeDateStamp);
      if ((int_data == 0) || (int_data == -1)) {
        return new Date(NaN);
      }
      let data = new Memory.Time_POSIX_S32LE(this.viewTimeDateStamp);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.timeDateStamp",
        error: e,
      });
    }
  }
  set timeDateStamp(newVal) {
    try {
      if (newVal.getTime() === NaN) {
        let int_data = new Memory.Sint32LE(this.viewTimeDateStamp);
        int_data.value = -1;
      }
      let data = new Memory.Time_POSIX_S32LE(this.viewTimeDateStamp);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.timeDateStamp",
        error: e,
      });
    }
  }
  get viewPointerToSymbolTable() {
    try {
      return this.#view.createSlice({
        start: 8,
        end: 12,
        byteLength: 4,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.viewPointerToSymbolTable",
        error: e,
      });
    }
  }
  set viewPointerToSymbolTable() {
    throw "COFFFileHeader.viewPointerToSymbolTable cannot be set.";
  }
  get pointerToSymbolTable() {
    try {
      let data = new Memory.Uint32LE(this.viewPointerToSymbolTable);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.pointerToSymbolTable",
        error: e,
      });
    }
  }
  set pointerToSymbolTable(newVal) {
    try {
      let data = new Memory.Uint32LE(this.viewPointerToSymbolTable);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.pointerToSymbolTable",
        error: e,
      });
    }
  }
  get viewNumberOfSymbols() {
    try {
      return this.#view.createSlice({
        start: 12,
        end: 16,
        byteLength: 4,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.viewNumberOfSymbols",
        error: e,
      });
    }
  }
  set viewNumberOfSymbols() {
    throw "COFFFileHeader.viewNumberOfSymbols cannot be set.";
  }
  get numberOfSymbols() {
    try {
      let data = new Memory.Uint32LE(this.viewNumberOfSymbols);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.numberOfSymbols",
        error: e,
      });
    }
  }
  set numberOfSymbols(newVal) {
    try {
      let data = new Memory.Uint32LE(this.viewNumberOfSymbols);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.numberOfSymbols",
        error: e,
      });
    }
  }
  get viewSizeOfOptionalHeader() {
    try {
      return this.#view.createSlice({
        start: 16,
        end: 18,
        byteLength: 2,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.viewSizeOfOptionalHeader",
        error: e,
      });
    }
  }
  set viewSizeOfOptionalHeader() {
    throw "COFFFileHeader.viewSizeOfOptionalHeader cannot be set.";
  }
  get sizeOfOptionalHeader() {
    try {
      let data = new Memory.Uint32LE(this.viewSizeOfOptionalHeader);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.sizeOfOptionalHeader",
        error: e,
      });
    }
  }
  set sizeOfOptionalHeader(newVal) {
    try {
      let data = new Memory.Uint32LE(this.viewSizeOfOptionalHeader);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.sizeOfOptionalHeader",
        error: e,
      });
    }
  }
  get viewCharacteristics() {
    try {
      return this.#view.createSlice({
        start: 18,
        end: 20,
        byteLength: 2,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.viewCharacteristics",
        error: e,
      });
    }
  }
  set viewCharacteristics() {
    throw "COFFFileHeader.viewCharacteristics cannot be set.";
  }
  get characteristics() {
    try {
      let data = new Memory.Uint16LE(this.viewCharacteristics);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.characteristics",
        error: e,
      });
    }
  }
  set characteristics(newVal) {
    try {
      let data = new Memory.Uint16LE(this.viewCharacteristics);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.characteristics",
        error: e,
      });
    }
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
"RELOCS_STRIPPED"  0x0001  // Image only, Windows CE, and Microsoft Windows NT and later. This indicates that the file does not contain base relocations and must therefore be loaded at its preferred base address. If the base address is not available, the loader reports an error. The default behavior of the linker is to strip base relocations from executable (EXE) files.
"EXECUTABLE_IMAGE" 0x0002  // Image only. This indicates that the image file is valid and can be run. If this flag is not set, it indicates a linker error.
"LINE_NUMS_STRIPPED" 0x0004  // COFF line numbers have been removed. This flag is deprecated and should be zero.
"LOCAL_SYMS_STRIPPED"  0x0008  // COFF symbol table entries for local symbols have been removed. This flag is deprecated and should be zero.
"AGGRESSIVE_WS_TRIM" 0x0010  // Obsolete. Aggressively trim working set. This flag is deprecated for Windows 2000 and later and must be zero.
"LARGE_ADDRESS_AWARE"  0x0020  // Application can handle > 2-GB addresses.
  0x0040  // This flag is reserved for future use.
"BYTES_REVERSED_LO"  0x0080  // Little endian: the least significant bit (LSB) precedes the most significant bit (MSB) in memory. This flag is deprecated and should be zero.
"32BIT_MACHINE"  0x0100  // Machine is based on a 32-bit-word architecture.
"DEBUG_STRIPPED" 0x0200  // Debugging information is removed from the image file.
"REMOVABLE_RUN_FROM_SWAP"  0x0400  // If the image is on removable media, fully load it and copy it to the swap file.
"NET_RUN_FROM_SWAP"  0x0800  // If the image is on network media, fully load it and copy it to the swap file.
"SYSTEM" 0x1000  // The image file is a system file, not a user program.
"DLL"  0x2000  // The image file is a dynamic-link library (DLL). Such files are considered executable files for almost all purposes, although they cannot be directly run.
"UP_SYSTEM_ONLY" 0x4000  // The file should be run only on a uniprocessor machine.
"BYTES_REVERSED_HI"  0x8000  // Big endian: the MSB precedes the LSB in memory. This flag is deprecated and should be zero.

class PE32OptionalHeader {
  #view;
  constructor(args) {
    try {
      this.#view = args;
      if (args.byteLength !== 20) {
        throw "PE32OptionalHeader requires a byteLength of 20.";
      }
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "PE32OptionalHeader constructor",
        error: e,
      });
    }
  }
  // The unsigned integer that identifies the state of the image file. The most common number is 0x10B, which identifies it as a normal executable file. 0x107 identifies it as a ROM image, and 0x20B identifies it as a PE32+ executable.
  get viewMagic() {
    try {
      return this.#view.createSlice({
        start: 0,
        end: 2,
        byteLength: 2,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32OptionalHeader.viewMagic",
        error: e,
      });
    }
  }
  set viewMagic() {
    throw "PE32OptionalHeader.viewMagic cannot be set.";
  }
  get magic() {
    try {
      let data = new Memory.Uint16LE(this.viewMagic);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.magic",
        error: e,
      });
    }
  }
  set magic(newVal) {
    try {
      let data = new Memory.Uint16LE(this.viewMagic);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.magic",
        error: e,
      });
    }
  }
  // The linker major version number.
  get viewMajorLinkerVersion() {
    try {
      return this.#view.createSlice({
        start: 2,
        end: 3,
        byteLength: 1,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32OptionalHeader.viewMajorLinkerVersion",
        error: e,
      });
    }
  }
  set viewMajorLinkerVersion() {
    throw "PE32OptionalHeader.viewMajorLinkerVersion cannot be set.";
  }
  get majorLinkerVersion() {
    try {
      let data = new Memory.Uint8(this.viewMajorLinkerVersion);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.majorLinkerVersion",
        error: e,
      });
    }
  }
  set majorLinkerVersion(newVal) {
    try {
      let data = new Memory.Uint8(this.viewMajorLinkerVersion);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.majorLinkerVersion",
        error: e,
      });
    }
  }
  // The linker minor version number.
  get viewMinorLinkerVersion() {
    try {
      return this.#view.createSlice({
        start: 3,
        end: 4,
        byteLength: 1,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32OptionalHeader.viewMinorLinkerVersion",
        error: e,
      });
    }
  }
  set viewMinorLinkerVersion() {
    throw "PE32OptionalHeader.viewMinorLinkerVersion cannot be set.";
  }
  get minorLinkerVersion() {
    try {
      let data = new Memory.Uint8(this.viewMinorLinkerVersion);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.minorLinkerVersion",
        error: e,
      });
    }
  }
  set minorLinkerVersion(newVal) {
    try {
      let data = new Memory.Uint8(this.viewMinorLinkerVersion);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.minorLinkerVersion",
        error: e,
      });
    }
  }
  // The size of the code (text) section, or the sum of all code sections if there are multiple sections.
  get viewSizeOfCode() {
    try {
      return this.#view.createSlice({
        start: 4,
        end: 8,
        byteLength: 4,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32OptionalHeader.viewSizeOfCode",
        error: e,
      });
    }
  }
  set viewSizeOfCode() {
    throw "PE32OptionalHeader.viewSizeOfCode cannot be set.";
  }
  get sizeOfCode() {
    try {
      let data = new Memory.Uint32LE(this.viewSizeOfCode);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.sizeOfCode",
        error: e,
      });
    }
  }
  set sizeOfCode(newVal) {
    try {
      let data = new Memory.Uint32LE(this.viewSizeOfCode);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.sizeOfCode",
        error: e,
      });
    }
  }
  // The size of the initialized data section, or the sum of all such sections if there are multiple data sections.
  get viewSizeOfInitializedData() {
    try {
      return this.#view.createSlice({
        start: 8,
        end: 12,
        byteLength: 4,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32OptionalHeader.viewSizeOfInitializedData",
        error: e,
      });
    }
  }
  set viewSizeOfInitializedData() {
    throw "PE32OptionalHeader.viewSizeOfInitializedData cannot be set.";
  }
  get sizeOfInitializedData() {
    try {
      let data = new Memory.Uint32LE(this.viewSizeOfInitializedData);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.sizeOfInitializedData",
        error: e,
      });
    }
  }
  set sizeOfInitializedData(newVal) {
    try {
      let data = new Memory.Uint32LE(this.viewSizeOfInitializedData);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.sizeOfInitializedData",
        error: e,
      });
    }
  }
  // The size of the uninitialized data section (BSS), or the sum of all such sections if there are multiple BSS sections.
  get viewSizeOfUninitializedData() {
    try {
      return this.#view.createSlice({
        start: 12,
        end: 16,
        byteLength: 4,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32OptionalHeader.viewSizeOfUninitializedData",
        error: e,
      });
    }
  }
  set viewSizeOfUninitializedData() {
    throw "PE32OptionalHeader.viewSizeOfUninitializedData cannot be set.";
  }
  get sizeOfUninitializedData() {
    try {
      let data = new Memory.Uint32LE(this.viewSizeOfInitializedData);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.sizeOfUninitializedData",
        error: e,
      });
    }
  }
  set sizeOfUninitializedData(newVal) {
    try {
      let data = new Memory.Uint32LE(this.viewSizeOfInitializedData);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.sizeOfUninitializedData",
        error: e,
      });
    }
  }
  // The address of the entry point relative to the image base when the executable file is loaded into memory. For program images, this is the starting address. For device drivers, this is the address of the initialization function. An entry point is optional for DLLs. When no entry point is present, this field must be zero.
  get viewAddressOfEntryPoint() {
    try {
      return this.#view.createSlice({
        start: 16,
        end: 20,
        byteLength: 4,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32OptionalHeader.viewAddressOfEntryPoint",
        error: e,
      });
    }
  }
  set viewAddressOfEntryPoint() {
    throw "PE32OptionalHeader.viewAddressOfEntryPoint cannot be set.";
  }
  get addressOfEntryPoint() {
    try {
      let data = new Memory.Uint32LE(this.viewAddressOfEntryPoint);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.addressOfEntryPoint",
        error: e,
      });
    }
  }
  set addressOfEntryPoint(newVal) {
    try {
      let data = new Memory.Uint32LE(this.viewAddressOfEntryPoint);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.addressOfEntryPoint",
        error: e,
      });
    }
  }
  // The address that is relative to the image base of the beginning-of-code section when it is loaded into memory.
  get viewBaseOfCode() {
    try {
      return this.#view.createSlice({
        start: 20,
        end: 24,
        byteLength: 4,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32OptionalHeader.viewBaseOfCode",
        error: e,
      });
    }
  }
  set viewBaseOfCode() {
    throw "PE32OptionalHeader.viewBaseOfCode cannot be set.";
  }
  get baseOfCode() {
    try {
      let data = new Memory.Uint32LE(this.viewBaseOfCode);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.baseOfCode",
        error: e,
      });
    }
  }
  set baseOfCode(newVal) {
    try {
      let data = new Memory.Uint32LE(this.viewBaseOfCode);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.baseOfCode",
        error: e,
      });
    }
  }
};

class PE32PlusOptionalHeader {
  #view;
  constructor(args) {
    this.#view = args;
  }
  // The unsigned integer that identifies the state of the image file. The most common number is 0x10B, which identifies it as a normal executable file. 0x107 identifies it as a ROM image, and 0x20B identifies it as a PE32+ executable.
  get viewMagic() {
    try {
      return this.#view.createSlice({
        start: 0,
        end: 2,
        byteLength: 2,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32PlusOptionalHeader.viewMagic",
        error: e,
      });
    }
  }
  set viewMagic() {
    throw "PE32PlusOptionalHeader.viewMagic cannot be set.";
  }
  get magic() {
    try {
      let data = new Memory.Uint16LE(this.viewMagic);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.magic",
        error: e,
      });
    }
  }
  set magic(newVal) {
    try {
      let data = new Memory.Uint16LE(this.viewMagic);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.magic",
        error: e,
      });
    }
  }
  // The linker major version number.
  get viewMajorLinkerVersion() {
    try {
      return this.#view.createSlice({
        start: 2,
        end: 3,
        byteLength: 1,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32PlusOptionalHeader.viewMajorLinkerVersion",
        error: e,
      });
    }
  }
  set viewMajorLinkerVersion() {
    throw "PE32PlusOptionalHeader.viewMajorLinkerVersion cannot be set.";
  }
  get majorLinkerVersion() {
    try {
      let data = new Memory.Uint8(this.viewMajorLinkerVersion);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.majorLinkerVersion",
        error: e,
      });
    }
  }
  set majorLinkerVersion(newVal) {
    try {
      let data = new Memory.Uint8(this.viewMajorLinkerVersion);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.majorLinkerVersion",
        error: e,
      });
    }
  }
  // The linker minor version number.
  get viewMinorLinkerVersion() {
    try {
      return this.#view.createSlice({
        start: 3,
        end: 4,
        byteLength: 1,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32PlusOptionalHeader.viewMinorLinkerVersion",
        error: e,
      });
    }
  }
  set viewMinorLinkerVersion() {
    throw "PE32PlusOptionalHeader.viewMinorLinkerVersion cannot be set.";
  }
  get minorLinkerVersion() {
    try {
      let data = new Memory.Uint8(this.viewMinorLinkerVersion);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.minorLinkerVersion",
        error: e,
      });
    }
  }
  set minorLinkerVersion(newVal) {
    try {
      let data = new Memory.Uint8(this.viewMinorLinkerVersion);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.minorLinkerVersion",
        error: e,
      });
    }
  }
  // The size of the code (text) section, or the sum of all code sections if there are multiple sections.
  get viewSizeOfCode() {
    try {
      return this.#view.createSlice({
        start: 4,
        end: 8,
        byteLength: 4,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32PlusOptionalHeader.viewSizeOfCode",
        error: e,
      });
    }
  }
  set viewSizeOfCode() {
    throw "PE32PlusOptionalHeader.viewSizeOfCode cannot be set.";
  }
  get sizeOfCode() {
    try {
      let data = new Memory.Uint32LE(this.viewSizeOfCode);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.sizeOfCode",
        error: e,
      });
    }
  }
  set sizeOfCode(newVal) {
    try {
      let data = new Memory.Uint32LE(this.viewSizeOfCode);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.sizeOfCode",
        error: e,
      });
    }
  }
  // The size of the initialized data section, or the sum of all such sections if there are multiple data sections.
  get viewSizeOfInitializedData() {
    try {
      return this.#view.createSlice({
        start: 8,
        end: 12,
        byteLength: 4,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32PlusOptionalHeader.viewSizeOfInitializedData",
        error: e,
      });
    }
  }
  set viewSizeOfInitializedData() {
    throw "PE32PlusOptionalHeader.viewSizeOfInitializedData cannot be set.";
  }
  get sizeOfInitializedData() {
    try {
      let data = new Memory.Uint32LE(this.viewSizeOfInitializedData);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.sizeOfInitializedData",
        error: e,
      });
    }
  }
  set sizeOfInitializedData(newVal) {
    try {
      let data = new Memory.Uint32LE(this.viewSizeOfInitializedData);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.sizeOfInitializedData",
        error: e,
      });
    }
  }
  // The size of the uninitialized data section (BSS), or the sum of all such sections if there are multiple BSS sections.
  get viewSizeOfUninitializedData() {
    try {
      return this.#view.createSlice({
        start: 12,
        end: 16,
        byteLength: 4,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32PlusOptionalHeader.viewSizeOfUninitializedData",
        error: e,
      });
    }
  }
  set viewSizeOfUninitializedData() {
    throw "PE32PlusOptionalHeader.viewSizeOfUninitializedData cannot be set.";
  }
  get sizeOfUninitializedData() {
    try {
      let data = new Memory.Uint32LE(this.viewSizeOfUninitializedData);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.sizeOfUninitializedData",
        error: e,
      });
    }
  }
  set sizeOfUninitializedData(newVal) {
    try {
      let data = new Memory.Uint32LE(this.viewSizeOfUninitializedData);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.sizeOfUninitializedData",
        error: e,
      });
    }
  }
  // The address of the entry point relative to the image base when the executable file is loaded into memory. For program images, this is the starting address. For device drivers, this is the address of the initialization function. An entry point is optional for DLLs. When no entry point is present, this field must be zero.
  get viewAddressOfEntryPoint() {
    try {
      return this.#view.createSlice({
        start: 16,
        end: 20,
        byteLength: 4,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32PlusOptionalHeader.viewAddressOfEntryPoint",
        error: e,
      });
    }
  }
  set viewAddressOfEntryPoint() {
    throw "PE32PlusOptionalHeader.viewAddressOfEntryPoint cannot be set.";
  }
  get addressOfEntryPoint() {
    try {
      let data = new Memory.Uint32LE(this.viewAddressOfEntryPoint);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.addressOfEntryPoint",
        error: e,
      });
    }
  }
  set addressOfEntryPoint(newVal) {
    try {
      let data = new Memory.Uint32LE(this.viewAddressOfEntryPoint);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.addressOfEntryPoint",
        error: e,
      });
    }
  }
  // The address that is relative to the image base of the beginning-of-code section when it is loaded into memory.
  get viewBaseOfCode() {
    try {
      return this.#view.createSlice({
        start: 20,
        end: 24,
        byteLength: 4,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32PlusOptionalHeader.viewBaseOfCode",
        error: e,
      });
    }
  }
  set viewBaseOfCode() {
    throw "PE32PlusOptionalHeader.viewBaseOfCode cannot be set.";
  }
  get baseOfCode() {
    try {
      let data = new Memory.Uint32LE(this.viewBaseOfCode);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.baseOfCode",
        error: e,
      });
    }
  }
  set baseOfCode(newVal) {
    try {
      let data = new Memory.Uint32LE(this.viewBaseOfCode);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.baseOfCode",
        error: e,
      });
    }
  }
  // The address that is relative to the image base of the beginning-of-data section when it is loaded into memory.
  get viewBaseOfData() {
    try {
      return this.#view.createSlice({
        start: 24,
        end: 28,
        byteLength: 4,
      });
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get PE32PlusOptionalHeader.viewBaseOfData",
        error: e,
      });
    }
  }
  set viewBaseOfData() {
    throw "PE32PlusOptionalHeader.viewBaseOfData cannot be set.";
  }
  get baseOfData() {
    try {
      let data = new Memory.Uint32LE(this.viewBaseOfData);
      return data.value;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "get COFFFileHeader.baseOfData",
        error: e,
      });
    }
  }
  set baseOfCode(newVal) {
    try {
      let data = new Memory.Uint32LE(this.viewBaseOfData);
      data.value = newVal;
    } catch (e) {
      ErrorLog.rethrow({
        functionName: "set COFFFileHeader.baseOfData",
        error: e,
      });
    }
  }
};
